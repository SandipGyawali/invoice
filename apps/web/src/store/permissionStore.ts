import { create } from 'zustand';

type PermissionStore = {
  ids: number[];
  setPermission: (id: number) => void;
  removePermission: (id: number) => void;
};

export const usePermissionStore = create<PermissionStore>((set) => ({
  ids: [],
  setPermission: (input: number) =>
    set((state) => ({
      ids: state.ids.find((val) => val === input)
        ? state.ids
        : [...state.ids, input],
    })),
  removePermission: (input: number) =>
    set((state) => ({
      ids: state.ids.filter((val) => val !== input),
    })),
}));
