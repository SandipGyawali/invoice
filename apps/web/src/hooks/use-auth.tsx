'use client';
import { useAuthStore } from '@/store/useAuthStore';

export const useAuth = (): boolean => {
  const authStore = useAuthStore.getState();

  const isAuthenticated =
    authStore.info.user.id && authStore.info.token.accessToken;

  return !!isAuthenticated;
};
