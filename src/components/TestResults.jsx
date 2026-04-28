import { normalize } from "../lib/codeRunner.js";

export default function TestResults({ state, problem, onSelectTab, activeTab }) {
  // state: { phase: "idle" | "running" | "done", mode: "run" | "submit",
  //          progress: { index, total }, results: [...], error: {...} }

  const sample = problem.tests?.sample ?? [];
  const hidden = problem.tests?.hidden ?? [];
  const totalSample = sample.length;
  const totalAll = totalSample + hidden.length;
  const runnable = totalSample > 0 || hidden.length > 0;

  if (!runnable) {
    return (
      <div className="results-panel">
        <div className="results-empty">
          <strong>No automated tests for this problem.</strong>
          <p>
            This is an exploration problem — the output depends on your platform
            (sizes, addresses, kernel version, etc.) or has no single right
            answer. Run your code locally with <code>gcc</code> and inspect the
            output yourself.
          </p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "sample", label: `Sample (${totalSample})`, disabled: totalSample === 0 },
    { id: "hidden", label: `Hidden (${hidden.length})`, disabled: hidden.length === 0 },
    { id: "results", label: "Results", disabled: !state.results && !state.error },
  ];

  return (
    <div className="results-panel">
      <div className="results-tabs">
        {tabs.map((t) => (
          <button
            key={t.id}
            className={"results-tab " + (activeTab === t.id ? "active" : "")}
            disabled={t.disabled}
            onClick={() => onSelectTab(t.id)}
          >
            {t.label}
          </button>
        ))}
        {state.phase === "running" && (
          <span className="results-progress">
            Running {state.progress.index + 1} / {state.progress.total}…
          </span>
        )}
        {state.phase === "done" && state.results && (
          <Summary results={state.results} mode={state.mode} totalAll={totalAll} />
        )}
      </div>

      <div className="results-body">
        {activeTab === "sample" && <TestList tests={sample} reveal />}
        {activeTab === "hidden" && (
          <div className="results-hidden-note">
            <p>
              <strong>{hidden.length}</strong> hidden test
              {hidden.length === 1 ? "" : "s"} will run when you click{" "}
              <strong>Submit</strong>. They cover edge cases beyond the sample
              tests — boundaries, larger inputs, special inputs (empty, zero,
              negatives where applicable).
            </p>
            <p>
              Inputs are not shown. If a hidden test fails, the failing input is
              revealed in the Results tab so you can debug.
            </p>
          </div>
        )}
        {activeTab === "results" && (
          <ResultsList state={state} sample={sample} hidden={hidden} />
        )}
      </div>
    </div>
  );
}

function Summary({ results, mode, totalAll }) {
  const passed = results.filter((r) => r.status === "passed").length;
  const failed = results.filter((r) => r.status === "failed").length;
  const errored = results.filter((r) => r.status === "error").length;
  const skipped = results.filter((r) => r.status === "skipped").length;

  let label;
  if (errored > 0) label = "Error";
  else if (failed > 0) label = `${failed} failed`;
  else if (skipped > 0) label = `${passed} passed, ${skipped} skipped`;
  else label = `Accepted (${passed}/${results.length})`;

  const cls = errored > 0 || failed > 0 ? "bad" : "good";
  return (
    <span className={"results-summary " + cls}>
      {mode === "submit" && passed === totalAll && failed === 0 && errored === 0
        ? `Accepted — all ${totalAll} tests passed`
        : label}
    </span>
  );
}

function TestList({ tests, reveal }) {
  if (tests.length === 0) return <p className="results-empty">No tests in this set.</p>;
  return (
    <ol className="test-list">
      {tests.map((t, i) => (
        <li key={i} className="test-item">
          <div className="test-row">
            <span className="test-label">stdin</span>
            <pre className="test-val">{reveal ? t.stdin || "(empty)" : "(hidden)"}</pre>
          </div>
          <div className="test-row">
            <span className="test-label">expected</span>
            <pre className="test-val">{reveal ? t.expectedStdout : "(hidden)"}</pre>
          </div>
          {reveal && t.note && <p className="test-note">{t.note}</p>}
        </li>
      ))}
    </ol>
  );
}

function ResultsList({ state, sample, hidden }) {
  if (state.error) {
    return (
      <div className="result-error">
        <strong>{state.error.title}</strong>
        <pre>{state.error.detail}</pre>
      </div>
    );
  }

  if (state.phase === "running") {
    return <p className="results-empty">Running tests…</p>;
  }
  if (!state.results) {
    return <p className="results-empty">Click Run or Submit to see results.</p>;
  }

  const allTests = state.mode === "submit" ? [...sample, ...hidden] : sample;

  return (
    <ol className="result-list">
      {state.results.map((r, i) => {
        const isHidden = state.mode === "submit" && i >= sample.length;
        const t = allTests[i];
        const passed = r.status === "passed";
        return (
          <li key={i} className={"result-item " + r.status}>
            <div className="result-head">
              <span className="result-status">
                {r.status === "passed" && "✓ Passed"}
                {r.status === "failed" && "✗ Failed"}
                {r.status === "error" && "! Error"}
                {r.status === "skipped" && "– Skipped"}
              </span>
              <span className="result-name">
                {isHidden ? `Hidden test ${i - sample.length + 1}` : `Sample test ${i + 1}`}
              </span>
            </div>
            {r.status === "error" && (
              <pre className="result-error-body">{r.message}{r.stderr ? "\n\n" + r.stderr : ""}</pre>
            )}
            {r.status === "skipped" && <p className="result-note">{r.message}</p>}
            {!passed && (r.status === "failed") && (
              <FailureDetail test={t} actual={r.stdout} stderr={r.stderr} />
            )}
            {passed && (
              <div className="test-row">
                <span className="test-label">stdout</span>
                <pre className="test-val">{r.stdout || "(empty)"}</pre>
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}

function FailureDetail({ test, actual, stderr }) {
  return (
    <>
      <div className="test-row">
        <span className="test-label">stdin</span>
        <pre className="test-val">{test.stdin || "(empty)"}</pre>
      </div>
      <div className="test-row">
        <span className="test-label">expected</span>
        <pre className="test-val">{normalize(test.expectedStdout) || "(empty)"}</pre>
      </div>
      <div className="test-row">
        <span className="test-label">your output</span>
        <pre className="test-val mismatch">{normalize(actual) || "(empty)"}</pre>
      </div>
      {stderr && (
        <div className="test-row">
          <span className="test-label">stderr</span>
          <pre className="test-val">{stderr}</pre>
        </div>
      )}
    </>
  );
}
