import { FASTING_PHASES } from "@/constants/fasting";

interface PhaseCardProps {
  phase: (typeof FASTING_PHASES)[number];
}

/* Displays current fasting phase with premium glassmorphism style */
export function PhaseCard({ phase }: PhaseCardProps) {
  return (
    <div
      className="w-full glass-card rounded-2xl p-5 text-center"
      style={{
        borderLeft: `2px solid ${phase.color}40`,
        boxShadow: `inset 0 0 30px ${phase.color}05`,
      }}
    >
      <p
        className="text-base font-light tracking-wider uppercase"
        style={{ color: phase.color, textShadow: `0 0 20px ${phase.color}30` }}
      >
        {phase.name}
      </p>
      <p className="text-[13px] font-extralight text-white/70 mt-2 leading-relaxed">
        {phase.description}
      </p>
      <p className="text-[11px] font-light text-slate-text mt-3 italic tracking-wide">
        {phase.tip}
      </p>
    </div>
  );
}
