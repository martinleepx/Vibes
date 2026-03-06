import { useState, useEffect, useRef } from "react";
import StickFigure from "./StickFigure";

export default function StrokeViewer({ stroke }) {
  const [activePhase, setActivePhase] = useState(0);
  const [playing, setPlaying] = useState(false);
  const intervalRef = useRef(null);

  const phases = stroke.phases;
  const phase = phases[activePhase];

  // Show ball on the contact phase
  const isContact = phase.label.toLowerCase().includes("contact");

  useEffect(() => {
    setActivePhase(0);
    setPlaying(false);
  }, [stroke.id]);

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setActivePhase((prev) => {
          if (prev >= phases.length - 1) {
            setPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 900);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [playing, phases.length]);

  function handlePlay() {
    if (activePhase === phases.length - 1) setActivePhase(0);
    setPlaying(true);
  }

  return (
    <div className="stroke-viewer">
      {/* ── Figure display ── */}
      <div className="figure-stage">
        {/* Phase label banner */}
        <div className="phase-banner">
          <span className="phase-number">{activePhase + 1}/{phases.length}</span>
          <span className="phase-label">{phase.label}</span>
        </div>

        {/* Stick figure */}
        <div className="figure-wrap">
          <StickFigure pose={phase.pose} showBall={isContact} scale={2.6} />
        </div>

        {/* Coaching cue */}
        <p className="phase-cue">{phase.cue}</p>
      </div>

      {/* ── Timeline / phase selector ── */}
      <div className="timeline">
        {phases.map((p, i) => (
          <button
            key={i}
            className={`timeline-step ${i === activePhase ? "active" : ""}`}
            onClick={() => { setPlaying(false); setActivePhase(i); }}
          >
            <span className="step-dot" />
            <span className="step-name">{p.label}</span>
          </button>
        ))}
      </div>

      {/* ── Playback controls ── */}
      <div className="controls">
        <button
          className="ctrl-btn"
          onClick={() => { setPlaying(false); setActivePhase((p) => Math.max(0, p - 1)); }}
          disabled={activePhase === 0}
          aria-label="Previous phase"
        >
          &#8592; Prev
        </button>
        <button
          className={`ctrl-btn play-btn ${playing ? "pause" : ""}`}
          onClick={() => playing ? setPlaying(false) : handlePlay()}
        >
          {playing ? "⏸ Pause" : "▶ Play"}
        </button>
        <button
          className="ctrl-btn"
          onClick={() => { setPlaying(false); setActivePhase((p) => Math.min(phases.length - 1, p + 1)); }}
          disabled={activePhase === phases.length - 1}
          aria-label="Next phase"
        >
          Next &#8594;
        </button>
      </div>

      {/* ── Tips ── */}
      <div className="tips-box">
        <h3 className="tips-heading">Key Tips</h3>
        <ul className="tips-list">
          {stroke.tips.map((t, i) => <li key={i}>{t}</li>)}
        </ul>
      </div>
    </div>
  );
}
