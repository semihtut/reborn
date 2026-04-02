"use client";

import { create } from "zustand";
import type { FastingSession } from "@/types/fasting";
import { db } from "@/lib/db";

interface FastingStore {
  currentSession: FastingSession | null;
  isRunning: boolean;
  elapsedSeconds: number;
  initialized: boolean;
  init: () => Promise<void>;
  startFasting: (targetHours: number) => Promise<void>;
  stopFasting: () => Promise<void>;
  tick: () => void;
}

export const useFastingStore = create<FastingStore>((set, get) => ({
  currentSession: null,
  isRunning: false,
  elapsedSeconds: 0,
  initialized: false,

  init: async () => {
    if (get().initialized) return;
    // Restore active session from DB
    const active = await db.sessions
      .where("status")
      .equals("active")
      .last();
    if (active) {
      const elapsed = Math.floor(
        (Date.now() - new Date(active.startTime).getTime()) / 1000
      );
      set({
        currentSession: active,
        isRunning: true,
        elapsedSeconds: elapsed,
        initialized: true,
      });
    } else {
      set({ initialized: true });
    }
  },

  startFasting: async (targetHours: number) => {
    const session: FastingSession = {
      startTime: new Date(),
      endTime: null,
      targetHours,
      status: "active",
      notes: "",
    };
    const id = await db.sessions.add(session);
    set({
      currentSession: { ...session, id },
      isRunning: true,
      elapsedSeconds: 0,
    });
  },

  stopFasting: async () => {
    const { currentSession } = get();
    if (!currentSession?.id) return;
    const endTime = new Date();
    await db.sessions.update(currentSession.id, {
      endTime,
      status: "completed",
    });
    set({
      currentSession: null,
      isRunning: false,
      elapsedSeconds: 0,
    });
  },

  tick: () => {
    const { currentSession, isRunning } = get();
    if (isRunning && currentSession) {
      const elapsed = Math.floor(
        (Date.now() - new Date(currentSession.startTime).getTime()) / 1000
      );
      set({ elapsedSeconds: elapsed });
    }
  },
}));
