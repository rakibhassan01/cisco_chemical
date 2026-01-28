"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import {
  getCurrentUser,
  getCartAction,
  syncCartAction,
} from "@/modules/auth/actions";

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
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const isSyncing = useRef(false);

  // Load user and sync with DB if needed
  useEffect(() => {
    const initCart = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);

      if (currentUser) {
        // Fetch DB cart
        const dbCart = await getCartAction();
        const localCartStr = localStorage.getItem(CART_STORAGE_KEY);
        const localItems: CartItem[] = localCartStr
          ? JSON.parse(localCartStr)
          : [];

        if (dbCart && dbCart.length > 0) {
          // Merge local items into DB cart if they exist
          const mergedItems: CartItem[] = [
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ...dbCart.map((item: Record<string, any>) => ({
              id: String(
                typeof item.product === "object" && item.product !== null
                  ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (item.product as Record<string, any>).id
                  : item.product,
              ),
              quantity: item.quantity,
              name: item.name || "",
              price: item.price || 0,
              image: item.image || "",
              slug: item.slug || "",
            })),
          ];

          if (localItems.length > 0) {
            localItems.forEach((localItem) => {
              const localId = String(localItem.id);
              const existingIndex = mergedItems.findIndex(
                (item) => String(item.id) === localId,
              );
              if (existingIndex > -1) {
                mergedItems[existingIndex].quantity += localItem.quantity;
              } else {
                mergedItems.push({
                  ...localItem,
                  id: localId,
                });
              }
            });
            // Sync merged result back to DB
            await syncCartAction(mergedItems);
            localStorage.removeItem(CART_STORAGE_KEY);
          }

          // Final deduplication safety pass
          const uniqueItems: CartItem[] = [];
          mergedItems.forEach((item) => {
            const existing = uniqueItems.find((u) => u.id === item.id);
            if (existing) {
              existing.quantity += item.quantity;
            } else {
              uniqueItems.push(item);
            }
          });

          setItems(uniqueItems);
        } else if (localItems.length > 0) {
          // No DB cart but has local items -> sync local to DB
          // Deduplicate localItems too just in case
          const uniqueLocal: CartItem[] = [];
          localItems.forEach((item) => {
            const id = String(item.id);
            const existing = uniqueLocal.find((u) => u.id === id);
            if (existing) {
              existing.quantity += item.quantity;
            } else {
              uniqueLocal.push({ ...item, id });
            }
          });

          await syncCartAction(uniqueLocal);
          setItems(uniqueLocal);
          localStorage.removeItem(CART_STORAGE_KEY);
        } else {
          setItems([]);
        }
      } else {
        // Not logged in, load from local storage
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (savedCart) {
          try {
            setItems(JSON.parse(savedCart));
          } catch {
            setItems([]);
          }
        }
      }
      setIsLoaded(true);
    };

    initCart();
  }, []);

  const saveCart = async (newItems: CartItem[]) => {
    if (typeof window === "undefined") return;

    setItems(newItems);

    if (user) {
      // Sync to DB
      isSyncing.current = true;
      await syncCartAction(newItems);
      isSyncing.current = false;
    } else {
      // Save to Local Storage
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newItems));
    }

    // Dispatch custom event with the new items to update other components immediately
    window.dispatchEvent(new CustomEvent(CART_UPDATE_EVENT, { detail: newItems }));
  };

  // Listen for cart updates from other instances/tabs
  useEffect(() => {
    const handleCartUpdate = (e: Event) => {
      // If this is a custom event from the same window, use the payload directly
      if (e instanceof CustomEvent && e.detail) {
        setItems(e.detail);
        return;
      }

      // Fallback: Read from storage (for multi-tab sync)
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        try {
          const parsedItems = JSON.parse(savedCart);
          setItems(parsedItems);
        } catch {
          // ignore error
        }
      }
    };

    window.addEventListener(CART_UPDATE_EVENT, handleCartUpdate);
    // Also listen for storage events (multi-tab sync)
    window.addEventListener("storage", handleCartUpdate);

    return () => {
      window.removeEventListener(CART_UPDATE_EVENT, handleCartUpdate);
      window.removeEventListener("storage", handleCartUpdate);
    };
  }, []);

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
    isLoaded,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    total,
    count,
  };
};
