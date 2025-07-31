import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type UserInfo = {
  id: string | null;
  email: string | null;
  name: string | null;
  tenantId: string | null;
};

export type Token = {
  accessToken: string | null;
  refreshToken: string | null;
};

type AuthStore = {
  info: {
    user: UserInfo;
    token: Token;
  };
  setInfo: (data: AuthStore['info']) => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      info: {
        user: {
          email: null,
          id: null,
          name: null,
          tenantId: null,
        },
        token: {
          accessToken: null,
          refreshToken: null,
        },
      },
      setInfo: (input) => set({ info: input }),
    }),
    {
      name: 'authDetails', // Storage key
      storage: createJSONStorage(() => localStorage),
    }
  )
);
