// src/store/productStore.ts
import { create } from "zustand";

// Define filters type
type Filters = {
  zx: boolean;
  Backpack: boolean;
  MousePad: boolean;
  Logitech: boolean;
  Rog: boolean;
  TUF: boolean;
};

// Define CartItem type
type CartItem = {
  id: string;
  name: string;
  price: number;
  count: number;
};

// Define your store's type
type ProductStore = {
  cart: CartItem[];  // Use CartItem[] instead of any[]
  searchQuery: string;
  filters: Filters;  // Using Filters directly here
  setSearchQuery: (query: string) => void;
  setFilters: (filters: Filters) => void; // Explicitly use Filters type here
};

// Create the store
const useProductStore = create<ProductStore>((set) => ({
  cart: [],
  searchQuery: "",
  filters: {
    zx: false,
    Backpack: false,
    MousePad: false,
    Logitech: false,
    Rog: false,
    TUF: false,
  },
  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilters: (filters) => set({ filters }),
}));

export default useProductStore;
