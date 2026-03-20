import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/lib/api";

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      setAuth: (token, user) => {
        localStorage.setItem("token", token);
        set({ token, user, isAuthenticated: true });
      },
      logout: () => {
        localStorage.removeItem("token");
        set({ token: null, user: null, isAuthenticated: false });
      },
      updateUser: (userData) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

interface NovelState {
  currentNovelId: string | null;
  setCurrentNovel: (novelId: string | null) => void;
}

export const useNovelStore = create<NovelState>()(
  persist(
    (set) => ({
      currentNovelId: null,
      setCurrentNovel: (novelId) => set({ currentNovelId: novelId }),
    }),
    {
      name: "novel-storage",
    }
  )
);

interface EditorState {
  content: string;
  wordCount: number;
  setContent: (content: string) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  content: "",
  wordCount: 0,
  setContent: (content) => set({ content, wordCount: content.length }),
}));
