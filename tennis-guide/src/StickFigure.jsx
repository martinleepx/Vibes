// StickFigure renders a tennis player as an SVG stick figure
// All positions are in a 100x130 coordinate space (viewBox clipped to content)

const BODY_COLOR = "#1a1a2e";
const RACKET_COLOR = "#e94560";
const BALL_COLOR = "#c8e600";
const HEAD_R = 7;
const STROKE_W = 3.5;
const JOINT_R = 2.5;

function line(p1, p2, color = BODY_COLOR, width = STROKE_W, key) {
  return (
    <line
      key={key}
      x1={p1.x} y1={p1.y}
      x2={p2.x} y2={p2.y}
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
    />
  );
}

export default function StickFigure({ pose, showBall = false, scale = 1 }) {
  const {
    head, neck, shoulderL, shoulderR,
    elbowL, elbowR, wristL, wristR,
    hip, kneeL, kneeR, ankleL, ankleR,
    racketTip, racketHand,
  } = pose;

  // Determine which wrist holds the racket
  const racketWrist = racketHand === "left" ? wristL : wristR;

  // Racket: line from wrist to tip, plus a small perpendicular head outline
  const dx = racketTip.x - racketWrist.x;
  const dy = racketTip.y - racketWrist.y;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const headSize = 5;

  // Four corners of the racket head (rectangle around the tip)
  const r1 = { x: racketTip.x + nx * headSize - dx * 0.1, y: racketTip.y + ny * headSize - dy * 0.1 };
  const r2 = { x: racketTip.x - nx * headSize - dx * 0.1, y: racketTip.y - ny * headSize - dy * 0.1 };
  const r3 = { x: racketTip.x + nx * headSize + dx * 0.25, y: racketTip.y + ny * headSize + dy * 0.25 };
  const r4 = { x: racketTip.x - nx * headSize + dx * 0.25, y: racketTip.y - ny * headSize + dy * 0.25 };

  return (
    <svg
      viewBox="0 -15 100 145"
      width={100 * scale}
      height={130 * scale}
      style={{ display: "block", overflow: "visible" }}
    >
      {/* ── Body segments ── */}
      {/* Spine */}
      {line(neck, hip, BODY_COLOR, STROKE_W, "spine")}
      {/* Shoulders */}
      {line(shoulderL, shoulderR, BODY_COLOR, STROKE_W, "shoulders")}
      {/* Left arm */}
      {line(shoulderL, elbowL, BODY_COLOR, STROKE_W, "uarmL")}
      {line(elbowL, wristL, BODY_COLOR, STROKE_W, "larmL")}
      {/* Right arm */}
      {line(shoulderR, elbowR, BODY_COLOR, STROKE_W, "uarmR")}
      {line(elbowR, wristR, BODY_COLOR, STROKE_W, "larmR")}
      {/* Hips */}
      {line({ x: hip.x - 10, y: hip.y }, { x: hip.x + 10, y: hip.y }, BODY_COLOR, STROKE_W, "hips")}
      {/* Left leg */}
      {line({ x: hip.x - 10, y: hip.y }, kneeL, BODY_COLOR, STROKE_W, "thighL")}
      {line(kneeL, ankleL, BODY_COLOR, STROKE_W, "shinL")}
      {/* Right leg */}
      {line({ x: hip.x + 10, y: hip.y }, kneeR, BODY_COLOR, STROKE_W, "thighR")}
      {line(kneeR, ankleR, BODY_COLOR, STROKE_W, "shinR")}
      {/* Feet (small horizontal lines) */}
      {line({ x: ankleL.x - 5, y: ankleL.y }, { x: ankleL.x + 3, y: ankleL.y }, BODY_COLOR, STROKE_W - 1, "footL")}
      {line({ x: ankleR.x - 3, y: ankleR.y }, { x: ankleR.x + 5, y: ankleR.y }, BODY_COLOR, STROKE_W - 1, "footR")}

      {/* ── Racket ── */}
      {/* Handle */}
      {line(racketWrist, racketTip, RACKET_COLOR, 2.5, "rHandle")}
      {/* Head outline */}
      <polygon
        points={`${r1.x},${r1.y} ${r3.x},${r3.y} ${r4.x},${r4.y} ${r2.x},${r2.y}`}
        fill="none"
        stroke={RACKET_COLOR}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      {/* Strings (2 cross + 2 vertical) */}
      <line x1={r1.x} y1={r1.y} x2={r2.x} y2={r2.y} stroke={RACKET_COLOR} strokeWidth={1} opacity={0.6} />
      <line x1={r3.x} y1={r3.y} x2={r4.x} y2={r4.y} stroke={RACKET_COLOR} strokeWidth={1} opacity={0.6} />
      <line
        x1={(r1.x + r3.x) / 2} y1={(r1.y + r3.y) / 2}
        x2={(r2.x + r4.x) / 2} y2={(r2.y + r4.y) / 2}
        stroke={RACKET_COLOR} strokeWidth={1} opacity={0.6}
      />

      {/* ── Head ── */}
      <circle cx={head.x} cy={head.y} r={HEAD_R} fill={BODY_COLOR} />
      {/* Neck connection */}
      {line(head, neck, BODY_COLOR, STROKE_W, "neck")}

      {/* ── Joints (dots for elbows / knees) ── */}
      {[elbowL, elbowR, kneeL, kneeR].map((j, i) => (
        <circle key={i} cx={j.x} cy={j.y} r={JOINT_R} fill={BODY_COLOR} />
      ))}

      {/* ── Ball (optional, near racket head) ── */}
      {showBall && (
        <circle
          cx={(r3.x + r4.x) / 2}
          cy={(r3.y + r4.y) / 2}
          r={4}
          fill={BALL_COLOR}
          stroke="#9ab800"
          strokeWidth={1}
        />
      )}
    </svg>
  );
}
