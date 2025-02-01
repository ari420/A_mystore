"use client";
import { create } from "zustand";

interface ProductData {
  id: string;
  name: string;
  price: number;
  imag: string;
  info: string;
  count: number;
}

type CartState = {
  cart: ProductData[];
  itemToDelete: string | null;
  isDeleteModalOpen: boolean;
  updateBasket: (item: ProductData) => void;
  myPlus: (id: string) => void;
  myMines: (id: string) => void;
  myDel: (id: string) => void;
  confirmDelete: () => void;
  cancelDelete: () => void;
};

const useCartStore = create<CartState>((set) => ({
  cart: [],
  itemToDelete: null,
  isDeleteModalOpen: false,

  updateBasket: (item) =>
    set((state) => {
      const itemExists = state.cart.find((product) => product.id === item.id);
      if (!itemExists) {
        return { cart: [...state.cart, item] };
      } else {
        alert("You already have this item in your cart.");
        return state;
      }
    }),

  myPlus: (id) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      ),
    })),

  myMines: (id) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id && item.count > 1
          ? { ...item, count: item.count - 1 }
          : item
      ),
    })),

  myDel: (id) =>
    set(() => ({
      itemToDelete: id,
      isDeleteModalOpen: true,
    })),

  confirmDelete: () =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== state.itemToDelete),
      isDeleteModalOpen: false,
      itemToDelete: null,
    })),

  cancelDelete: () =>
    set(() => ({
      isDeleteModalOpen: false,
      itemToDelete: null,
    })),
}));

export default useCartStore;
