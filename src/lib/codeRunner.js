// Wraps Wandbox's compile API. We send the user's C source plus stdin,
// get back stdout/stderr and exit info, and run a list of test cases
// against it.
//
// Wandbox doesn't set CORS headers, so the request goes through the Vite
// dev proxy at /wandbox (configured in vite.config.js) which forwards to
// https://wandbox.org/api. Each request is compiled and run in a fresh
// sandbox, so there's no persistent state between calls.

const WANDBOX_URL = "/wandbox/compile.json";
const C_COMPILER = "gcc-head-c";

// Run the user's code once with the given stdin. Returns a normalised
// result so callers don't need to know about Wandbox's response shape.
export async function runOnce(code, stdin) {
  const body = {
    code,
    compiler: C_COMPILER,
    stdin: stdin ?? "",
    "compiler-option-raw": "-Wall\n-Wextra",
  };

  let resp;
  try {
    resp = await fetch(WANDBOX_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (e) {
    return {
      ok: false,
      kind: "network",
      message: "Couldn't reach the code runner: " + e.message,
    };
  }

  if (!resp.ok) {
    const text = await resp.text().catch(() => "");
    return {
      ok: false,
      kind: "http",
      message: `Runner returned HTTP ${resp.status}: ${text.slice(0, 200)}`,
    };
  }

  const data = await resp.json();
  const stdout = data.program_output || "";
  const stderr = data.program_error || "";
  const compilerErr = data.compiler_error || "";
  const status = data.status === undefined ? null : Number(data.status);

  // Wandbox uses `signal` (e.g. "Killed", "Aborted") when the process is
  // terminated by the sandbox, typically a runtime timeout.
  if (data.signal) {
    return {
      ok: false,
      kind: "timeout",
      message: `Program terminated by signal: ${data.signal}`,
      stdout,
      stderr,
    };
  }

  // If the program never produced output and the compiler did, the failure
  // is at compile time. Status is the compiler's exit code in that case.
  if (compilerErr && !stdout && !stderr && status !== 0) {
    return {
      ok: false,
      kind: "compile",
      message: compilerErr,
    };
  }

  return {
    ok: true,
    stdout,
    stderr,
    exitCode: status ?? 0,
  };
}

// Trim trailing whitespace on every line and trim trailing blank lines —
// the most common source of false negatives is "extra newline at end".
// Memory addresses (%p output) are normalised to <addr> so problems that
// print pointers can still be tested deterministically.
export function normalize(s) {
  return String(s ?? "")
    .replace(/0x[0-9a-fA-F]+/g, "<addr>")
    .split("\n")
    .map((line) => line.replace(/[ \t]+$/g, ""))
    .join("\n")
    .replace(/\n+$/, "");
}

export function outputsMatch(actual, expected) {
  return normalize(actual) === normalize(expected);
}

// Run a list of tests sequentially. We do them one at a time to be polite
// to the public Wandbox endpoint. Sequential is fine — total wall time
// for a typical 5-test submission is about 2-3 seconds.
export async function runTests(code, tests, onProgress) {
  const results = [];
  for (let i = 0; i < tests.length; i++) {
    const t = tests[i];
    onProgress?.({ index: i, total: tests.length, status: "running" });
    const r = await runOnce(code, t.stdin ?? "");
    if (!r.ok) {
      results.push({
        index: i,
        test: t,
        status: "error",
        kind: r.kind,
        message: r.message,
        stderr: r.stderr,
      });
      // A compile error fails every subsequent test for the same reason.
      // Bail out so the user isn't waiting for 10 redundant errors.
      if (r.kind === "compile" || r.kind === "network") {
        for (let j = i + 1; j < tests.length; j++) {
          results.push({
            index: j,
            test: tests[j],
            status: "skipped",
            message: "Skipped because of earlier failure.",
          });
        }
        break;
      }
      continue;
    }

    const passed = outputsMatch(r.stdout, t.expectedStdout ?? "");
    results.push({
      index: i,
      test: t,
      status: passed ? "passed" : "failed",
      stdout: r.stdout,
      stderr: r.stderr,
      exitCode: r.exitCode,
    });
  }
  return results;
}
