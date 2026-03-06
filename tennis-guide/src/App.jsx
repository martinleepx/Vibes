import { useState } from "react";
import { strokes } from "./strokeData";
import StrokeViewer from "./StrokeViewer";
import "./App.css";

export default function App() {
  const [selectedId, setSelectedId] = useState(strokes[0].id);
  const stroke = strokes.find((s) => s.id === selectedId);

  return (
    <div className="app">
      {/* ── Header ── */}
      <header className="app-header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-icon">🎾</span>
            <span className="logo-text">TennisForm</span>
          </div>
          <p className="header-tagline">Visual stroke breakdowns for every shot</p>
        </div>
      </header>

      <main className="app-main">
        {/* ── Stroke selector ── */}
        <nav className="stroke-nav" aria-label="Stroke selection">
          {strokes.map((s) => (
            <button
              key={s.id}
              className={`stroke-tab ${s.id === selectedId ? "selected" : ""}`}
              onClick={() => setSelectedId(s.id)}
            >
              {s.name}
            </button>
          ))}
        </nav>

        {/* ── Content area ── */}
        <div className="content">
          <div className="stroke-header">
            <h2 className="stroke-title">{stroke.name}</h2>
            <p className="stroke-desc">{stroke.description}</p>
          </div>
          <StrokeViewer stroke={stroke} />
        </div>
      </main>

      <footer className="app-footer">
        <p>Step through each phase or hit Play to watch the full motion.</p>
      </footer>
    </div>
  );
}
