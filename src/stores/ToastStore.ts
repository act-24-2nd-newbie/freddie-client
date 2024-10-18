import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

interface ToastStore {
  toasts: Toast[];
  addToast: (message: string) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>(set => ({
  toasts: [],
  addToast: (message: string) => {
    const id = uuidv4();
    set(state => ({
      toasts: [...state.toasts, { id, message }].slice(-4),
    }));

    setTimeout(() => {
      set(state => ({
        toasts: state.toasts.filter(toast => toast.id !== id),
      }));
    }, 3000);
  },
  removeToast: (id: string) =>
    set(state => ({
      toasts: state.toasts.filter(toast => toast.id !== id),
    })),
}));
