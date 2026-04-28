import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import problems, { sections } from "../data/problems.js";

const DIFFS = ["All", "Easy", "Medium", "Hard"];

export default function ProblemList() {
  const [diff, setDiff] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return problems.filter((p) => {
      if (diff !== "All" && p.difficulty !== diff) return false;
      if (query && !p.title.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [diff, query]);

  const grouped = useMemo(() => {
    const map = new Map();
    for (const s of sections) map.set(s.name, []);
    for (const p of filtered) {
      if (!map.has(p.topic)) map.set(p.topic, []);
      map.get(p.topic).push(p);
    }
    return map;
  }, [filtered]);

  return (
    <div className="list-page">
      <div className="list-page-inner">
      <div className="list-toolbar">
        <input
          type="text"
          className="search"
          placeholder="Search problems by title…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="diff-filter">
          {DIFFS.map((d) => (
            <button
              key={d}
              className={"diff-btn " + (diff === d ? "active" : "")}
              onClick={() => setDiff(d)}
            >
              {d}
            </button>
          ))}
        </div>
        <div className="count">{filtered.length} / {problems.length}</div>
      </div>

      {sections.map((s) => {
        const group = grouped.get(s.name) || [];
        if (group.length === 0) return null;
        return (
          <section key={s.id} className="section-block">
            <h2 className="section-title">
              <span className="section-num">{s.id}</span>
              {s.name}
              <span className="section-range">#{s.range}</span>
            </h2>
            <table className="problem-table">
              <thead>
                <tr>
                  <th style={{ width: 60 }}>#</th>
                  <th>Title</th>
                  <th style={{ width: 110 }}>Difficulty</th>
                </tr>
              </thead>
              <tbody>
                {group.map((p) => (
                  <tr key={p.id}>
                    <td className="num-cell">{p.number}</td>
                    <td>
                      <Link to={`/problem/${p.id}`} className="title-link">
                        {p.title}
                      </Link>
                    </td>
                    <td>
                      <span className={"difficulty d-" + p.difficulty.toLowerCase()}>
                        {p.difficulty}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        );
      })}
      </div>
    </div>
  );
}
