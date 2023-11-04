import create from "zustand";
import { persist } from 'zustand/middleware'

let openStore = (set) => ({
    dopen: true,
    updateOpen: (dopen) => set((state) => ({ dopen: dopen })),
})

openStore = persist(openStore, { name: "open_sider" });
export const useOpenStore = create(openStore);