"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, ShoppingCart, User } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 lg:hidden w-[95%] max-w-md">
      <div className="bg-white/85 backdrop-blur-xl border border-white/40 rounded-3xl p-2 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex flex-col items-center justify-center w-[4.5rem] h-14 z-10 select-none outline-none"
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-active"
                  className="absolute inset-0 bg-green-500/10 rounded-2xl"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}
              
              <motion.div
                whileTap={{ scale: 0.85 }}
                animate={{
                  y: isActive ? -2 : 0,
                }}
                className="relative flex flex-col items-center justify-center w-full h-full"
              >
                <div className="relative">
                  <Icon 
                    className={cn(
                      "w-5 h-5 transition-all duration-300", 
                      isActive ? "text-green-600 stroke-[2.5px]" : "text-zinc-500"
                    )} 
                  />
                  
                  {item.showBadge && count > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white text-[10px] font-bold min-w-[16px] h-[16px] px-1 flex items-center justify-center rounded-full shadow-sm ring-2 ring-white">
                      {count > 99 ? '99+' : count}
                    </span>
                  )}
                </div>

                <motion.span 
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0.6,
                    scale: isActive ? 1 : 0.9,
                    y: isActive ? 0 : 2
                  }}
                  className={cn(
                    "text-[10px] font-medium mt-1 transition-colors duration-300",
                    isActive ? "text-green-700" : "text-zinc-500"
                  )}
                >
                  {item.label}
                </motion.span>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
