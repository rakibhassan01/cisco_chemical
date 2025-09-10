"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, User } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
  { href: "/careers", label: "Careers" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`w-full border-b border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md fixed top-0 left-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-lg bg-white/98 dark:bg-gray-900/98" : ""
      }`}
    >
      {/* <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 lg:py-4"> */}
      {/* Wider Navbar  => */}
      <div className="max-w-8xl mx-auto flex items-center justify-between px-6 lg:px-12 py-3 lg:py-4">
        {/* Logo - Left */}
        <Link
          href="/"
          className="flex items-center space-x-2 text-xl sm:text-2xl font-bold text-black dark:text-white group flex-shrink-0"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 relative">
            <Image
              src="/images/logo.png"
              alt="Logo"
              fill
              className="object-contain transition-transform duration-300 group-hover:rotate-12"
            />
          </div>
          <span className="transition-colors duration-300 group-hover:text-green-600 dark:group-hover:text-green-400">
            Cisco Chem
          </span>
        </Link>

        {/* Desktop Nav - Center (Changed positioning) */}
        <nav className="hidden lg:flex gap-8 flex-1 justify-center mx-8">
          {navLinks.map(({ href, label }, idx) => (
            <Link
              key={href}
              href={href}
              className="relative text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300 py-2
                after:content-[''] after:block after:h-[2px] after:bg-green-600 dark:after:bg-green-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left after:mt-1"
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right side - ThemeToggle + Login + Mobile Menu */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Theme Toggle - Desktop */}
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>

          {/* Login Button */}
          <Link
            href="/sign-in"
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-green-600 dark:bg-green-700 text-white text-sm font-medium hover:bg-green-700 dark:hover:bg-green-600 transition-all duration-300 hover:shadow-md hover:scale-105"
          >
            <User className="w-4 h-4" />
            Login
          </Link>

          {/* Mobile Left side - ThemeToggle + Menu */}
          <div className="flex items-center gap-2 sm:hidden">
            {/* Theme Toggle - Mobile */}
            <ThemeToggle />

            {/* Mobile Menu Trigger */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
                <Menu className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full sm:w-80 bg-gradient-to-br from-white via-gray-50 to-green-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-green-950/30 border-l border-gray-200/60 dark:border-gray-700/60 backdrop-blur-xl"
              >
                {/* Mobile Header */}
                <div className="flex items-center justify-center pb-8 border-b border-gray-200/60 dark:border-gray-700/60">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 relative">
                      <Image
                        src="/images/logo.png"
                        alt="Logo"
                        fill
                        className="object-contain rounded-lg"
                      />
                    </div>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      Cisco Chem
                    </span>
                  </div>
                </div>

                {/* Mobile Navigation Links */}
                <nav className="mt-8 space-y-3">
                  {navLinks.map(({ href, label }, idx) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className="relative block px-6 py-4 rounded-xl text-center text-gray-800 dark:text-gray-200 bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 backdrop-blur-md transition-all duration-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-white/70 dark:hover:bg-gray-700/70 hover:border-green-400 dark:hover:border-green-500"
                      style={{
                        animation: `slideInFromRight 0.4s ease-out ${idx * 0.1}s both`,
                      }}
                    >
                      <span className="text-base font-medium tracking-wide">
                        {label}
                      </span>

                      {/* Dot indicator on hover */}
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-green-500 dark:bg-green-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110" />
                    </Link>
                  ))}

                  {/* Login Button */}
                  <Link
                    href="/sign-in"
                    onClick={() => setIsOpen(false)}
                    className="block text-center mt-10 px-6 py-4 rounded-xl bg-green-600 dark:bg-green-700 text-white font-medium tracking-wide transition-all duration-300 hover:bg-green-700 dark:hover:bg-green-600"
                    style={{
                      animation: `slideInFromRight 0.4s ease-out ${navLinks.length * 0.1}s both`,
                    }}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <User className="w-5 h-5" />
                      Login to Account
                    </div>
                  </Link>
                </nav>

                {/* Decorative Footer */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-green-50/40 dark:from-green-950/40 to-transparent pointer-events-none"></div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Menu Trigger (hidden, kept for consistency) */}
          <div className="hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
                <Menu className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </SheetTrigger>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Modern animations and responsive utilities */}
      <style jsx global>{`
        @keyframes slideInFromRight {
          0% {
            opacity: 0;
            transform: translateX(30px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        /* Custom breakpoint for extra small screens */
        @media (min-width: 475px) {
          .xs\\:block {
            display: block;
          }
          .xs\\:hidden {
            display: none;
          }
        }

        @media (max-width: 474px) {
          .xs\\:block {
            display: none;
          }
          .xs\\:hidden {
            display: block;
          }
        }
      `}</style>
    </header>
  );
};
