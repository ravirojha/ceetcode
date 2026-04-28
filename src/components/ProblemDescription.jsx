import { useMemo } from "react";

// Minimal markdown-ish renderer: supports paragraphs, ``` fenced code blocks,
// `inline code`, and **bold**. Anything else stays plain text. We deliberately
// keep this small instead of pulling in a markdown library.
function renderRich(text) {
  if (!text) return null;
  const parts = text.split(/(```[\s\S]*?```)/g);
  return parts.map((part, i) => {
    if (part.startsWith("```")) {
      const code = part.replace(/^```\w*\n?/, "").replace(/```$/, "");
      return (
        <pre key={i} className="code-block">
          <code>{code}</code>
        </pre>
      );
    }
    return <p key={i}>{renderInline(part)}</p>;
  });
}

function renderInline(text) {
  // Split on `code` and **bold** markers. Order matters: handle code first.
  const tokens = [];
  let buf = "";
  let i = 0;
  while (i < text.length) {
    if (text[i] === "`") {
      if (buf) { tokens.push({ t: "text", v: buf }); buf = ""; }
      const end = text.indexOf("`", i + 1);
      if (end === -1) { buf += text[i]; i++; continue; }
      tokens.push({ t: "code", v: text.slice(i + 1, end) });
      i = end + 1;
    } else if (text[i] === "*" && text[i + 1] === "*") {
      if (buf) { tokens.push({ t: "text", v: buf }); buf = ""; }
      const end = text.indexOf("**", i + 2);
      if (end === -1) { buf += text[i]; i++; continue; }
      tokens.push({ t: "bold", v: text.slice(i + 2, end) });
      i = end + 2;
    } else {
      buf += text[i];
      i++;
    }
  }
  if (buf) tokens.push({ t: "text", v: buf });

  return tokens.map((tok, idx) => {
    if (tok.t === "code") return <code key={idx} className="inline-code">{tok.v}</code>;
    if (tok.t === "bold") return <strong key={idx}>{tok.v}</strong>;
    return splitWithBreaks(tok.v, idx);
  });
}

function splitWithBreaks(text, key) {
  // Preserve paragraph breaks within text segments.
  const lines = text.split("\n");
  return lines.map((line, idx) => (
    <span key={key + ":" + idx}>
      {line}
      {idx < lines.length - 1 && <br />}
    </span>
  ));
}

export default function ProblemDescription({ problem }) {
  const desc = useMemo(() => renderRich(problem.description), [problem.description]);

  return (
    <div className="description">
      <div className="io-notice">
        <strong>How submissions work.</strong> Unlike LeetCode, this is real C.
        Your code is compiled and run as a complete program — output is whatever
        you write to <code className="inline-code">stdout</code>, typically with{" "}
        <code className="inline-code">printf</code>. There is no return value
        from a "solution function" that the grader inspects.
        <br />
        Every starter provides a <code className="inline-code">main()</code>{" "}
        driver that reads the test's stdin and prints the result. Most problems
        ask you to implement a named function (e.g.{" "}
        <code className="inline-code">my_atoi</code>) — the driver calls it and
        prints the return value, so you don't add{" "}
        <code className="inline-code">printf</code> yourself. A few ask you to
        fill in <code className="inline-code">// TODO</code> comments inside{" "}
        <code className="inline-code">main</code>, which may include the{" "}
        <code className="inline-code">printf</code> call. The starter shows
        which case you're in.
      </div>

      <div className="desc-section">
        <h3 className="desc-h">Description</h3>
        <div className="desc-body">{desc}</div>
      </div>

      <div className="desc-section">
        <h3 className="desc-h">Examples</h3>
        {problem.examples.map((ex, i) => (
          <div key={i} className="example">
            <div className="example-label">Example {i + 1}:</div>
            <div className="example-row">
              <span className="example-key">Input:</span>
              <pre className="example-val">{ex.input}</pre>
            </div>
            <div className="example-row">
              <span className="example-key">Output:</span>
              <pre className="example-val">{ex.output}</pre>
            </div>
            {ex.explanation && (
              <div className="example-row">
                <span className="example-key">Explanation:</span>
                <span className="example-val example-explain">
                  {renderInline(ex.explanation)}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="desc-section">
        <h3 className="desc-h">Constraints</h3>
        <ul className="constraints">
          {problem.constraints.map((c, i) => (
            <li key={i}>{renderInline(c)}</li>
          ))}
        </ul>
      </div>

      <div className="desc-section">
        <h3 className="desc-h">Reference reading</h3>
        <ul className="references">
          {problem.references.map((r, i) => (
            <li key={i}>
              <a href={r.url} target="_blank" rel="noreferrer noopener">
                {r.title}
              </a>
              <span className="ref-host"> · {hostOf(r.url)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function hostOf(url) {
  try { return new URL(url).host.replace(/^www\./, ""); }
  catch { return ""; }
}
