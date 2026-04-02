"use client";

interface WaterDropletProps {
  size?: number;
  variant?: "dna" | "pulse";
  glowColor?: string;
}

/* 3D water droplet with internal DNA helix or pulse line */
export function WaterDroplet({
  size = 220,
  variant = "dna",
  glowColor = "#00a0ff",
}: WaterDropletProps) {
  return (
    <div
      className="relative animate-droplet-float"
      style={{ width: size, height: size }}
    >
      {/* Outer glow ring */}
      <div
        className="absolute inset-0 rounded-full animate-droplet-pulse"
        style={{
          background: `radial-gradient(circle, ${glowColor}20 0%, transparent 70%)`,
          transform: "scale(1.3)",
        }}
      />

      <svg
        viewBox="0 0 200 240"
        width={size}
        height={size * 1.2}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ filter: `drop-shadow(0 0 30px ${glowColor}30)` }}
      >
        <defs>
          {/* 3D gradient for droplet body */}
          <radialGradient id="droplet-grad" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#1a3a5c" />
            <stop offset="40%" stopColor="#0a1e35" />
            <stop offset="100%" stopColor="#040a14" />
          </radialGradient>

          {/* Highlight gradient for gloss effect */}
          <radialGradient id="droplet-highlight" cx="35%" cy="25%" r="30%">
            <stop offset="0%" stopColor="white" stopOpacity="0.15" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>

          {/* Electric blue edge glow */}
          <radialGradient id="edge-glow" cx="50%" cy="50%" r="50%">
            <stop offset="70%" stopColor="transparent" />
            <stop offset="95%" stopColor={glowColor} stopOpacity="0.12" />
            <stop offset="100%" stopColor={glowColor} stopOpacity="0.03" />
          </radialGradient>

          {/* Clip path for internal elements */}
          <clipPath id="droplet-clip">
            <path d="M100 20 C100 20, 160 100, 160 145 C160 185, 133 215, 100 215 C67 215, 40 185, 40 145 C40 100, 100 20, 100 20Z" />
          </clipPath>
        </defs>

        {/* Droplet body */}
        <path
          d="M100 20 C100 20, 160 100, 160 145 C160 185, 133 215, 100 215 C67 215, 40 185, 40 145 C40 100, 100 20, 100 20Z"
          fill="url(#droplet-grad)"
          stroke={glowColor}
          strokeWidth="0.8"
          strokeOpacity="0.25"
        />

        {/* Edge glow overlay */}
        <path
          d="M100 20 C100 20, 160 100, 160 145 C160 185, 133 215, 100 215 C67 215, 40 185, 40 145 C40 100, 100 20, 100 20Z"
          fill="url(#edge-glow)"
        />

        {/* 3D highlight/gloss */}
        <path
          d="M100 20 C100 20, 160 100, 160 145 C160 185, 133 215, 100 215 C67 215, 40 185, 40 145 C40 100, 100 20, 100 20Z"
          fill="url(#droplet-highlight)"
        />

        {/* Internal visual — clipped to droplet shape */}
        <g clipPath="url(#droplet-clip)">
          {variant === "dna" ? (
            <DnaHelix glowColor={glowColor} />
          ) : (
            <PulseLine glowColor={glowColor} />
          )}
        </g>

        {/* Top specular highlight */}
        <ellipse
          cx="85"
          cy="75"
          rx="12"
          ry="8"
          fill="white"
          opacity="0.06"
          transform="rotate(-20 85 75)"
        />
      </svg>
    </div>
  );
}

/* DNA double helix rendered as two sinusoidal paths with connecting rungs */
function DnaHelix({ glowColor }: { glowColor: string }) {
  const helixPoints1: string[] = [];
  const helixPoints2: string[] = [];

  for (let i = 0; i <= 100; i++) {
    const t = i / 100;
    const y = 60 + t * 150;
    const x1 = 100 + Math.sin(t * Math.PI * 4) * 25;
    const x2 = 100 - Math.sin(t * Math.PI * 4) * 25;
    helixPoints1.push(`${i === 0 ? "M" : "L"}${x1},${y}`);
    helixPoints2.push(`${i === 0 ? "M" : "L"}${x2},${y}`);
  }

  /* Horizontal rungs connecting the two strands */
  const rungs = [];
  for (let i = 0; i <= 8; i++) {
    const t = i / 8;
    const y = 60 + t * 150;
    const x1 = 100 + Math.sin(t * Math.PI * 4) * 25;
    const x2 = 100 - Math.sin(t * Math.PI * 4) * 25;
    rungs.push({ x1, x2, y });
  }

  return (
    <g className="animate-shimmer">
      {/* Strand 1 */}
      <path
        d={helixPoints1.join(" ")}
        fill="none"
        stroke={glowColor}
        strokeWidth="1.5"
        strokeOpacity="0.3"
      />
      {/* Strand 2 */}
      <path
        d={helixPoints2.join(" ")}
        fill="none"
        stroke={glowColor}
        strokeWidth="1.5"
        strokeOpacity="0.2"
      />
      {/* Rungs */}
      {rungs.map((rung, idx) => (
        <line
          key={idx}
          x1={rung.x1}
          y1={rung.y}
          x2={rung.x2}
          y2={rung.y}
          stroke={glowColor}
          strokeWidth="0.6"
          strokeOpacity="0.15"
        />
      ))}
    </g>
  );
}

/* Pulse/heartbeat line through the center */
function PulseLine({ glowColor }: { glowColor: string }) {
  return (
    <g className="animate-shimmer">
      <path
        d="M50 140 L75 140 L82 120 L90 160 L98 110 L106 170 L114 130 L120 140 L150 140"
        fill="none"
        stroke={glowColor}
        strokeWidth="1.5"
        strokeOpacity="0.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M50 140 L75 140 L82 120 L90 160 L98 110 L106 170 L114 130 L120 140 L150 140"
        fill="none"
        stroke={glowColor}
        strokeWidth="3"
        strokeOpacity="0.08"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}
