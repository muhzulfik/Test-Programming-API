import { create } from "zustand";

export const useTrigger = create((set) => ({
	trigger: false,
	setTrigger: (trigger) => set({ trigger }),
}));
