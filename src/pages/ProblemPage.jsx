import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import problems from "../data/problems.js";
import ProblemDescription from "../components/ProblemDescription.jsx";
import CodeEditor from "../components/CodeEditor.jsx";
import TestResults from "../components/TestResults.jsx";
import { runTests } from "../lib/codeRunner.js";

const STORAGE_PREFIX = "c-leetcode:code:";

const initialRun = { phase: "idle", mode: null, progress: { index: 0, total: 0 }, results: null, error: null };

export default function ProblemPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const problem = problems.find((p) => String(p.id) === String(id));

  // null = not loaded yet; "" is a legitimate user value once loaded.
  const [code, setCode] = useState(null);
  const [splitPct, setSplitPct] = useState(48);
  const [editorPct, setEditorPct] = useState(60);
  const [runState, setRunState] = useState(initialRun);
  const [activeTab, setActiveTab] = useState("sample");
  const containerRef = useRef(null);
  const editorContainerRef = useRef(null);
  const draggingRef = useRef(false);
  const draggingEditorRef = useRef(false);

  useEffect(() => {
    if (!problem) return;
    const saved = localStorage.getItem(STORAGE_PREFIX + problem.id);
    setCode(saved && saved.length > 0 ? saved : problem.starterCode);
    setRunState(initialRun);
    setActiveTab("sample");
  }, [problem?.id]);

  useEffect(() => {
    if (!problem || code === null) return;
    localStorage.setItem(STORAGE_PREFIX + problem.id, code);
  }, [code, problem?.id]);

  useEffect(() => {
    function onMove(e) {
      if (draggingRef.current && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const pct = ((e.clientX - rect.left) / rect.width) * 100;
        setSplitPct(Math.min(80, Math.max(20, pct)));
      }
      if (draggingEditorRef.current && editorContainerRef.current) {
        const rect = editorContainerRef.current.getBoundingClientRect();
        const pct = ((e.clientY - rect.top) / rect.height) * 100;
        setEditorPct(Math.min(85, Math.max(20, pct)));
      }
    }
    function onUp() {
      draggingRef.current = false;
      draggingEditorRef.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  if (!problem) {
    return (
      <div style={{ padding: 40 }}>
        <p>Problem not found.</p>
        <Link to="/">← Back to list</Link>
      </div>
    );
  }

  function resetCode() {
    if (confirm("Reset to starter code? Your changes will be lost.")) {
      setCode(problem.starterCode);
    }
  }

  function startDrag() {
    draggingRef.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  }

  function startEditorDrag() {
    draggingEditorRef.current = true;
    document.body.style.cursor = "row-resize";
    document.body.style.userSelect = "none";
  }

  const sample = problem.tests?.sample ?? [];
  const hidden = problem.tests?.hidden ?? [];
  const runnable = sample.length > 0 || hidden.length > 0;

  async function runOrSubmit(mode) {
    if (code == null) return;
    const tests = mode === "submit" ? [...sample, ...hidden] : sample;
    if (tests.length === 0) return;

    setActiveTab("results");
    setRunState({
      phase: "running",
      mode,
      progress: { index: 0, total: tests.length },
      results: null,
      error: null,
    });

    try {
      const results = await runTests(code, tests, ({ index, total }) => {
        setRunState((s) => ({ ...s, progress: { index, total } }));
      });
      setRunState({
        phase: "done",
        mode,
        progress: { index: tests.length, total: tests.length },
        results,
        error: null,
      });
    } catch (e) {
      setRunState({
        phase: "done",
        mode,
        progress: { index: 0, total: tests.length },
        results: null,
        error: { title: "Runner crashed", detail: String(e) },
      });
    }
  }

  const idx = problems.findIndex((p) => p.id === problem.id);
  const prev = idx > 0 ? problems[idx - 1] : undefined;
  const next = idx >= 0 && idx < problems.length - 1 ? problems[idx + 1] : undefined;
  const isRunning = runState.phase === "running";

  return (
    <div className="problem-page">
      <div className="problem-toolbar">
        <Link to="/" className="back-link">← All problems</Link>
        <div className="problem-toolbar-title">
          <span className={"difficulty d-" + problem.difficulty.toLowerCase()}>
            {problem.difficulty}
          </span>
          <span className="problem-num">#{problem.number}</span>
          <span className="problem-name">{problem.title}</span>
        </div>
        <div className="problem-toolbar-nav">
          <button
            disabled={!prev}
            onClick={() => prev && navigate(`/problem/${prev.id}`)}
          >
            ‹ Prev
          </button>
          <button
            disabled={!next}
            onClick={() => next && navigate(`/problem/${next.id}`)}
          >
            Next ›
          </button>
        </div>
      </div>

      <div className="split" ref={containerRef}>
        <div className="split-left" style={{ width: splitPct + "%" }}>
          <ProblemDescription problem={problem} />
        </div>
        <div className="split-divider" onMouseDown={startDrag} />
        <div className="split-right" style={{ width: 100 - splitPct + "%" }}>
          <div className="editor-toolbar">
            <span className="editor-lang">C</span>
            <div className="editor-actions">
              <button onClick={resetCode}>Reset</button>
              <button
                className="btn-secondary"
                disabled={!runnable || isRunning || sample.length === 0}
                onClick={() => runOrSubmit("run")}
              >
                {isRunning && runState.mode === "run" ? "Running…" : "Run"}
              </button>
              <button
                className="btn-primary"
                disabled={!runnable || isRunning}
                onClick={() => runOrSubmit("submit")}
              >
                {isRunning && runState.mode === "submit" ? "Submitting…" : "Submit"}
              </button>
            </div>
          </div>
          <div className="editor-stack" ref={editorContainerRef}>
            <div className="editor-host" style={{ height: editorPct + "%" }}>
              {code !== null && <CodeEditor value={code} onChange={setCode} />}
            </div>
            <div className="editor-vdivider" onMouseDown={startEditorDrag} />
            <div className="editor-results" style={{ height: 100 - editorPct + "%" }}>
              <TestResults
                state={runState}
                problem={problem}
                activeTab={activeTab}
                onSelectTab={setActiveTab}
              />
            </div>
          </div>
          <div className="editor-footer">
            Code is auto-saved to your browser. Run/Submit executes via a remote
            sandbox (Wandbox, gcc head on Linux x86_64). Compile locally with:
            <code> gcc -Wall -Wextra -g main.c -o main && ./main</code>
          </div>
        </div>
      </div>
    </div>
  );
}
