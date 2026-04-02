import { FASTING_PHASES } from "@/constants/fasting";

interface PhaseCardProps {
  phase: (typeof FASTING_PHASES)[number];
}

export function PhaseCard({ phase }: PhaseCardProps) {
  return (
    <div
      className="w-full rounded-2xl p-4 text-center"
      style={{ backgroundColor: `${phase.color}10`, borderLeft: `3px solid ${phase.color}` }}
    >
      <p className="font-semibold text-lg" style={{ color: phase.color }}>
        {phase.name}
      </p>
      <p className="text-sm text-slate-300 mt-1">{phase.description}</p>
      <p className="text-xs text-slate-400 mt-2 italic">{phase.tip}</p>
    </div>
  );
}
