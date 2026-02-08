"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, ShoppingCart, User } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "Products",
    href: "/products",
    icon: Package,
  },
  {
    label: "Cart",
    href: "/cart",
    icon: ShoppingCart,
    showBadge: true,
  },
  {
    label: "Account",
    href: "/account",
    icon: User,
  },
];

export const BottomNav = () => {
  const pathname = usePathname();
  const { count } = useCart();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      <div className="bg-white/80 backdrop-blur-lg border-t border-zinc-200 px-6 py-3 pb-8 flex items-center justify-between shadow-[0_-1px_10px_rgba(0,0,0,0.05)]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex flex-col items-center gap-1 transition-colors duration-200",
                isActive ? "text-green-600" : "text-zinc-500 hover:text-zinc-900"
              )}
            >
              <div className={cn(
                "p-2 rounded-xl transition-all duration-300",
                isActive ? "bg-green-50" : "bg-transparent"
              )}>
                <Icon className="w-5 h-5" />
              </div>
              
              {item.showBadge && count > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
                  {count}
                </span>
              )}

              <span className="text-[10px] font-bold uppercase tracking-wider">
                {item.label}
              </span>

              {isActive && (
                <div className="absolute -bottom-1 w-1 h-1 bg-green-600 rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
