"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, User, Search, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { useQueryState } from "nuqs";
import { useRouter, usePathname } from "next/navigation";
import { UserNav } from "@/modules/auth/ui/components/user-nav";
import { getCurrentUser, signOutAction } from "@/modules/auth/actions";
import { toast } from "sonner";
import { User as UserType } from "@/payload-types";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
  { href: "/careers", label: "Careers" },
];

interface NavbarProps {
  user?: UserType | null;
}

export const Navbar = ({ user: initialUser }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [search] = useQueryState("q", { defaultValue: "" });
  const [inputValue, setInputValue] = useState(search);
  const [user, setUser] = useState<UserType | null>(initialUser || null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (initialUser) {
      setUser(initialUser);
    }
  }, [initialUser]);

  useEffect(() => {
    setInputValue(search);
  }, [search]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close search on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isSearchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      router.push(`/products?q=${encodeURIComponent(inputValue.trim())}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <header
      className={`w-full border-b border-gray-200 bg-white/95 backdrop-blur-md fixed top-0 left-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-lg bg-white/98" : ""
      }`}
    >
      {/* Main Navbar */}
      <div className="max-w-8xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-12 py-3 lg:py-4">
        {/* Logo - Left */}
        <Link
          href="/"
          className="flex items-center space-x-2 text-xl sm:text-2xl font-bold text-black group flex-shrink-0 lg:ml-10"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 relative">
            <Image
              src="/images/logo.png"
              alt="Logo"
              fill
              className="object-contain transition-transform duration-300 group-hover:rotate-12"
              priority
            />
          </div>
          <span className="transition-colors duration-300 group-hover:text-green-600">
            Cisco Chem
          </span>
        </Link>

        {/* Desktop Nav - Center */}
        <nav className="hidden lg:flex gap-8 flex-1 justify-center mx-4">
          {navLinks.map(({ href, label }, idx) => (
            <Link
              key={href}
              href={href}
              className="relative text-sm font-medium text-gray-600 hover:text-green-600 transition-all duration-300 py-2
                after:content-[''] after:block after:h-[2px] after:bg-green-600 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left after:mt-1"
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right side - Search + ThemeToggle + Login + Mobile Menu */}
        <div className="flex items-center gap-3 flex-shrink-0 lg:mr-10">
          {/* Search Button - Desktop */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-600 hover:text-green-600 hover:border-green-300 transition-all duration-300 hover:shadow-md"
          >
            <Search className="w-4 h-4" />
            <span className="text-sm hidden lg:inline">Search</span>
          </button>

          {/* User Navigation (Login/Profile) */}
          <div className="hidden sm:block">
            <UserNav user={user} />
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center gap-2 sm:hidden">
            {/* Search Button - Mobile */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <Search className="h-5 w-5 text-gray-700" />
            </button>

            {/* Mobile Menu Trigger */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <Menu className="h-5 w-5 text-gray-700" />
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full sm:w-80 bg-gradient-to-br from-white via-gray-50 to-green-50/30 border-l border-gray-200/60 backdrop-blur-xl"
              >
                {/* Mobile Header */}
                <div className="flex items-center justify-center pb-8 border-b border-gray-200/60">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 relative">
                      <Image
                        src="/images/logo.png"
                        alt="Logo"
                        fill
                        className="object-contain rounded-lg"
                      />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">
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
                      className="relative block px-6 py-4 rounded-xl text-center text-gray-800 bg-white/50 border border-gray-300 backdrop-blur-md transition-all duration-300 hover:text-green-600 hover:bg-white/70 hover:border-green-400"
                      style={{
                        animation: `slideInFromRight 0.4s ease-out ${idx * 0.1}s both`,
                      }}
                    >
                      <span className="text-base font-medium tracking-wide">
                        {label}
                      </span>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-green-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110" />
                    </Link>
                  ))}

                  {/* Mobile User Section */}
                  <div
                    className="pt-4"
                    style={{
                      animation: `slideInFromRight 0.4s ease-out ${navLinks.length * 0.1}s both`,
                    }}
                  >
                    {!user ? (
                      <Link
                        href="/sign-in"
                        onClick={() => setIsOpen(false)}
                        className="block text-center px-6 py-4 rounded-xl bg-green-600 text-white font-medium tracking-wide transition-all duration-300 hover:bg-green-700"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <User className="w-5 h-5" />
                          Login to Account
                        </div>
                      </Link>
                    ) : (
                      <div className="space-y-3">
                        <div className="px-6 py-4 rounded-xl bg-green-50 border border-green-100 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
                            {user.name?.[0]?.toUpperCase() || "U"}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-900 leading-none">
                              {user.name}
                            </span>
                            <span className="text-xs text-gray-500 truncate max-w-[150px]">
                              {user.email}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={async () => {
                            await signOutAction();
                            setIsOpen(false);
                            toast.success("Signed out successfully");
                          }}
                          className="w-full text-center px-6 py-4 rounded-xl border border-red-200 text-red-600 font-medium tracking-wide transition-all duration-300 hover:bg-red-50"
                        >
                          Sign Out
                        </button>
                      </div>
                    )}
                  </div>
                </nav>

                {/* Decorative Footer */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-green-50/40 to-transparent pointer-events-none"></div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-start justify-center pt-20">
          <div className="w-full max-w-2xl mx-4">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              {/* Search Header */}
              <div className="flex items-center gap-4 p-6 border-b border-gray-200">
                <Search className="w-6 h-6 text-gray-400" />
                <form onSubmit={handleSearch} className="flex-1">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Search products, chemicals, solutions..."
                    className="w-full text-lg bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none"
                    autoFocus
                  />
                </form>
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Search Suggestions */}
              <div className="p-6">
                <div className="space-y-3">
                  <p className="text-sm text-gray-500 font-medium">
                    Quick Searches
                  </p>
                  {[
                    "Industrial Chemicals",
                    "Safety Equipment",
                    "Laboratory Supplies",
                    "Chemical Analysis",
                  ].map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        const val = suggestion;
                        setInputValue(val);
                        router.push(`/products?q=${encodeURIComponent(val)}`);
                        setIsSearchOpen(false);
                      }}
                      className="block w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Search className="w-4 h-4 text-gray-400" />
                        {suggestion}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Styles */}
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
