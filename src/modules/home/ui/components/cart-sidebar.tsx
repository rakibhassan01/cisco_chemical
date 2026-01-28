"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/hooks/use-cart";
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

export const CartSidebar = ({ children }: { children: React.ReactNode }) => {
  const { items, removeFromCart, updateQuantity, total, count, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-full sm:w-[450px] pr-0 flex flex-col z-[100]">
        <SheetHeader className="px-6 border-b pb-4">
          <SheetTitle className="flex items-center justify-between pr-8">
            <span className="text-xl font-bold">Shopping Cart ({count})</span>
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors"
              >
                Clear all
              </button>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Your cart is empty</h3>
              <p className="text-sm text-gray-500 max-w-[200px] mx-auto">
                Looks like you haven&apos;t added anything to your cart yet.
              </p>
            </div>
            <Button 
              onClick={() => setIsOpen(false)}
              className="bg-green-600 hover:bg-green-700 text-white rounded-xl"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-6 -mr-4 pr-10">
              <div className="space-y-6 py-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-gray-100 shrink-0 bg-gray-50">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div className="space-y-1">
                        <Link 
                          href={`/products/${item.slug}`} 
                          onClick={() => setIsOpen(false)}
                          className="font-semibold text-sm hover:text-green-600 transition-colors line-clamp-2"
                        >
                          {item.name}
                        </Link>
                        <p className="text-sm font-bold text-green-600">
                          ${item.price.toLocaleString()}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border rounded-lg h-8 bg-white overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-full flex items-center justify-center hover:bg-gray-50 text-gray-500 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => {
                              const value = parseInt(e.target.value);
                              if (!isNaN(value) && value > 0) {
                                updateQuantity(item.id, value);
                              }
                            }}
                            className="w-10 h-full text-center text-xs font-medium border-x border-gray-100 focus:outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-full flex items-center justify-center hover:bg-gray-50 text-gray-500 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-6 border-t bg-gray-50/50 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-semibold">${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-base font-bold">
                  <span>Total</span>
                  <span>${total.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white font-bold h-12 rounded-xl text-base shadow-lg shadow-green-600/20">
                  <Link href="/checkout" onClick={() => setIsOpen(false)}>
                    Checkout Now <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <SheetTrigger asChild>
                  <Link 
                    href="/cart" 
                    className="block w-full text-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    View Full Cart
                  </Link>
                </SheetTrigger>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
