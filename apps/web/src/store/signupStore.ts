import { create } from 'zustand';

type Org = {
  name: string;
  email?: string;
};

type User = {
  name: string;
  email?: string;
  password: string;
  // Add more user fields if needed
};

type SignUpStore = {
  org: Org;
  user: User;
  updateOrg: (input: Org) => void;
  updateUser: (input: User) => void;
};

export const useSignUpStore = create<SignUpStore>((set) => ({
  org: {
    name: '',
    email: '',
  },
  user: {},
  updateOrg: (input) => set(() => ({ org: input })),
  updateUser: (input) => set(() => ({ user: input })),
}));
