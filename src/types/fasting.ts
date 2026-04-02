export interface FastingSession {
  id?: number;
  startTime: Date;
  endTime: Date | null;
  targetHours: number;
  status: FastingStatus;
  notes: string;
}

export type FastingStatus = "active" | "completed" | "cancelled";

export interface HydrationEntry {
  id?: number;
  sessionId: number | null;
  timestamp: Date;
  amountMl: number;
}

export interface FastingStats {
  totalFasts: number;
  completedFasts: number;
  longestFastHours: number;
  currentStreak: number;
  averageDurationHours: number;
  totalHoursFasted: number;
}

export interface MilestoneReached {
  hours: number;
  title: string;
  message: string;
  reachedAt: Date;
}

export interface DailyHydration {
  date: string;
  totalMl: number;
  entries: number;
}
