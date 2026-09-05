import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartItem, Currency } from '@/types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  currency: Currency;
  addItem: (item: Omit<CartItem, 'id' | 'quantity'>, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleCart: (open?: boolean) => void;
  setCurrency: (currency: Currency) => void;
  clearCart: () => void;
  getTotalCount: () => number;
  getSubtotalKes: () => number;
  getSubtotalUsd: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      currency: 'KES',

      addItem: (item, quantity = 1) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (i) => i.productId === item.productId && i.size === item.size
          );

          if (existingIndex > -1) {
            const updated = [...state.items];
            updated[existingIndex].quantity += quantity;
            return { items: updated, isOpen: true };
          }

          const newItem: CartItem = {
            ...item,
            id: `${item.productId}-${item.size}-${Date.now()}`,
            quantity,
          };

          return { items: [...state.items, newItem], isOpen: true };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },

      toggleCart: (open) => {
        set((state) => ({
          isOpen: typeof open === 'boolean' ? open : !state.isOpen,
        }));
      },

      setCurrency: (currency) => {
        set({ currency });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalCount: () => {
        return get().items.reduce((acc, item) => acc + item.quantity, 0);
      },

      getSubtotalKes: () => {
        return get().items.reduce((acc, item) => acc + item.priceKes * item.quantity, 0);
      },

      getSubtotalUsd: () => {
        return get().items.reduce((acc, item) => acc + item.priceUsd * item.quantity, 0);
      },
    }),
    {
      name: 'modern-man-cart-session',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items, currency: state.currency }),
    }
  )
);
