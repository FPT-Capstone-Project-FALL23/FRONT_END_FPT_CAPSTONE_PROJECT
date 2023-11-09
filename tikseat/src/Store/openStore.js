import create from "zustand";
import { persist } from "zustand/middleware";

let openStore = (set) => ({
  searchEvent: {},
  dopen: true,
  setSearchEvent: (data) => set(() => ({ searchEvent: data })),
  updateOpen: (dopen) => set((state) => ({ dopen: dopen })),
});

openStore = persist(openStore, { name: "open_sider" });
export const useOpenStore = create(openStore);
