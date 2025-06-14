import { create } from 'zustand';
import {} from 'zustand/middleware';

type SignUpStore = {
  org: null;
  user: null;
  updateOrg: (input: null) => void;
  updateUser: (input: null) => void;
};

export const useSignUpStore = create<SignUpStore>(() => ({
  org: null,
  user: null,
  updateOrg: (input) => ({
    org: input,
  }),
  updateUser: (input) => ({
    user: input,
  }),
}));
