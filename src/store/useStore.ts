import { create } from 'zustand';

interface AppState {
  darkMode: boolean;
  toggleDarkMode: () => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  user: { name: string; email: string; role: string; avatar?: string } | null;
  setUser: (user: AppState['user']) => void;
}

export const useStore = create<AppState>((set) => ({
  darkMode: false,
  toggleDarkMode: () => set((state) => {
    const next = !state.darkMode;
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', next);
    }
    return { darkMode: next };
  }),
  sidebarOpen: true,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  user: { name: 'Admin User', email: 'admin@lpay.ug', role: 'Super Admin' },
  setUser: (user) => set({ user }),
}));
