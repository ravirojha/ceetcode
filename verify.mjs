// Hits the public Wandbox API directly (no Vite proxy) and runs the given
// C source against a problem's sample + hidden tests. Used to sanity-check
// that test expected-outputs match a known-correct implementation.
//
//   node verify.mjs <problemId>            # runs first 8 tests
//   node verify.mjs <problemId> all        # runs every test
//
// The known-correct solutions live in solutions/<id>.c relative to this file.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import tests from "./src/data/tests.js";

const WANDBOX_URL = "https://wandbox.org/api/compile.json";
const here = dirname(fileURLToPath(import.meta.url));

function normalize(s) {
  return String(s ?? "")
    .replace(/0x[0-9a-fA-F]+/g, "<addr>")
    .split("\n")
    .map((line) => line.replace(/[ \t]+$/g, ""))
    .join("\n")
    .replace(/\n+$/, "");
}

async function runOnce(code, stdin) {
  const body = {
    code,
    compiler: "gcc-head-c",
    stdin: stdin ?? "",
    "compiler-option-raw": "-Wall\n-Wextra",
  };
  // Wandbox sometimes returns OCI/clone resource errors under load —
  // retry a few times before giving up.
  for (let attempt = 0; attempt < 4; attempt++) {
    const resp = await fetch(WANDBOX_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await resp.json();
    const err = data.compiler_error || "";
    const transient =
      err.includes("OCI runtime error") ||
      err.includes("Resource temporarily unavailable");
    if (transient && attempt < 3) {
      await new Promise((r) => setTimeout(r, 1500 * (attempt + 1)));
      continue;
    }
    return {
      stdout: data.program_output || "",
      stderr: data.program_error || "",
      compilerError: err,
      status: data.status,
      signal: data.signal,
    };
  }
}

const id = Number(process.argv[2]);
const mode = process.argv[3] ?? "first8";
if (!id) {
  console.error("usage: node verify.mjs <problemId> [all]");
  process.exit(1);
}

const code = readFileSync(join(here, "solutions", `${id}.c`), "utf8");
const t = tests[id];
if (!t) {
  console.error(`no tests defined for problem ${id}`);
  process.exit(1);
}

const all = [
  ...t.sample.map((c, i) => ({ ...c, label: `sample[${i}]` })),
  ...t.hidden.map((c, i) => ({ ...c, label: `hidden[${i}]` })),
];
const cases = mode === "all" ? all : all.slice(0, 8);

console.log(`# Problem ${id}: running ${cases.length}/${all.length} cases\n`);
let passed = 0;
let failed = 0;
for (const c of cases) {
  const r = await runOnce(code, c.stdin);
  if (r.compilerError && !r.stdout) {
    console.log(`✗ ${c.label}: COMPILE ERROR`);
    console.log(r.compilerError.split("\n").slice(0, 5).join("\n"));
    failed++;
    break;
  }
  const got = normalize(r.stdout);
  const want = normalize(c.expectedStdout);
  const ok = got === want;
  if (ok) {
    passed++;
    console.log(`✓ ${c.label}`);
  } else {
    failed++;
    const stdinPreview = JSON.stringify(c.stdin).slice(0, 80);
    console.log(`✗ ${c.label}  stdin=${stdinPreview}`);
    console.log(`   want: ${JSON.stringify(want).slice(0, 200)}`);
    console.log(`   got:  ${JSON.stringify(got).slice(0, 200)}`);
  }
}
console.log(`\n# ${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
