// Proxies POST /wandbox/compile.json to https://wandbox.org/api/compile.json.
//
// We previously did this with a Netlify [[redirects]] rule (status=200, force=true).
// That edge-proxy occasionally returns
//   HTTP 500: Error: No space left on device (os error 28)
// when several test cases run back-to-back — the rewrite worker runs out of
// scratch disk while buffering the upstream response. A Function gives us a
// real Node runtime, no edge-proxy disk limit, and a place to retry transient
// upstream errors.

const WANDBOX_URL = "https://wandbox.org/api/compile.json";

async function callWandbox(body) {
  const resp = await fetch(WANDBOX_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });
  const text = await resp.text();
  return { status: resp.status, text };
}

function isTransientWandboxError(text) {
  // Wandbox occasionally surfaces sandbox-side container errors that resolve
  // on the next request. Retry these once.
  return (
    text.includes("OCI runtime error") ||
    text.includes("Resource temporarily unavailable")
  );
}

export default async (request) => {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const body = await request.text();

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const r = await callWandbox(body);
      if (r.status >= 500 || isTransientWandboxError(r.text)) {
        if (attempt < 2) {
          await new Promise((resolve) =>
            setTimeout(resolve, 800 * (attempt + 1))
          );
          continue;
        }
      }
      return new Response(r.text, {
        status: r.status,
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      if (attempt < 2) {
        await new Promise((resolve) =>
          setTimeout(resolve, 800 * (attempt + 1))
        );
        continue;
      }
      return new Response(
        JSON.stringify({ error: "Upstream fetch failed: " + err.message }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }
  }
};