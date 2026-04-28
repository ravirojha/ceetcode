import { Routes, Route, Link, useLocation } from "react-router-dom";
import ProblemList from "./pages/ProblemList.jsx";
import ProblemPage from "./pages/ProblemPage.jsx";

export default function App() {
  const location = useLocation();
  const isProblem = location.pathname.startsWith("/problem/");
  return (
    <div className="app">
      <header className="topbar">
        <Link to="/" className="brand">
          <span className="brand-mark">C</span>
          <span className="brand-name">LeetCode</span>
        </Link>
        {!isProblem && (
          <span className="topbar-sub">Phase 1A · 74 problems for kernel-grade C</span>
        )}
      </header>
      <Routes>
        <Route path="/" element={<ProblemList />} />
        <Route path="/problem/:id" element={<ProblemPage />} />
      </Routes>
    </div>
  );
}
