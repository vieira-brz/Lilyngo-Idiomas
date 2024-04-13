import { create } from 'zustand'

type ExisModalState = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

export const useExitModal = create<ExisModalState>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}))