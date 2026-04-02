"use client";

import { create } from "zustand";
import type { FastingSession } from "@/types/fasting";

interface FastingStore {
  currentSession: FastingSession | null;
  isRunning: boolean;
  elapsedSeconds: number;
  startFasting: (targetHours: number) => void;
  stopFasting: () => void;
  tick: () => void;
  setCurrentSession: (session: FastingSession | null) => void;
}

export const useFastingStore = create<FastingStore>((set, get) => ({
  currentSession: null,
  isRunning: false,
  elapsedSeconds: 0,

  startFasting: (targetHours: number) => {
    const session: FastingSession = {
      startTime: new Date(),
      endTime: null,
      targetHours,
      status: "active",
      notes: "",
    };
    set({ currentSession: session, isRunning: true, elapsedSeconds: 0 });
  },

  stopFasting: () => {
    const { currentSession } = get();
    if (currentSession) {
      set({
        currentSession: { ...currentSession, endTime: new Date(), status: "completed" },
        isRunning: false,
      });
    }
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

  setCurrentSession: (session) => {
    set({
      currentSession: session,
      isRunning: session?.status === "active",
      elapsedSeconds: session
        ? Math.floor((Date.now() - new Date(session.startTime).getTime()) / 1000)
        : 0,
    });
  },
}));
