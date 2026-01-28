"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  slug: string;
}

const CART_STORAGE_KEY = "cisco_chem_cart";
const CART_UPDATE_EVENT = "cart-update";

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);

  const loadCart = useCallback(() => {
    if (typeof window === "undefined") return;
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
        setItems([]);
      }
    }
  }, []);

  useEffect(() => {
    loadCart();

    const handleUpdate = () => {
      loadCart();
    };

    window.addEventListener(CART_UPDATE_EVENT, handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener(CART_UPDATE_EVENT, handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [loadCart]);

  const saveCart = (newItems: CartItem[]) => {
    if (typeof window === "undefined") return;
    setItems(newItems);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newItems));
    window.dispatchEvent(new Event(CART_UPDATE_EVENT));
  };

  const addToCart = (
    product: {
      id: string;
      name: string;
      price: number;
      image: string;
      slug?: string | null;
    },
    quantity: number = 1,
  ) => {
    const existingItem = items.find((item) => item.id === product.id);
    let newItems;

    if (existingItem) {
      newItems = items.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item,
      );
    } else {
      const newItem: CartItem = {
        id: product.id,
        name: product.name,
        price: product.price || 0,
        quantity: quantity,
        image: product.image,
        slug: product.slug || "",
      };
      newItems = [...items, newItem];
    }

    saveCart(newItems);
    toast.success(`Added ${product.name} to cart`);
  };

  const removeFromCart = (id: string) => {
    const newItems = items.filter((item) => item.id !== id);
    saveCart(newItems);
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    const newItems = items.map((item) =>
      item.id === id ? { ...item, quantity } : item,
    );
    saveCart(newItems);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const count = items.reduce((acc, item) => acc + item.quantity, 0);

  return {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    total,
    count,
  };
};
