import Dexie, { type EntityTable } from "dexie";
import type { FastingSession, HydrationEntry } from "@/types/fasting";

const db = new Dexie("WaterFastingDB") as Dexie & {
  sessions: EntityTable<FastingSession, "id">;
  hydration: EntityTable<HydrationEntry, "id">;
};

db.version(1).stores({
  sessions: "++id, startTime, status",
  hydration: "++id, sessionId, timestamp",
});

export { db };
