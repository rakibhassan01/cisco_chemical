"use client";

import { useState, useEffect, useRef } from "react";
import { useQueryState } from "nuqs";
import { ChevronRight, Beaker, Search } from "lucide-react";
import Image from "next/image";
import { Product, Media, Category } from "@/payload-types";

interface ProductsViewProps {
  initialProducts?: Product[];
}

export function ProductsView({ initialProducts = [] }: ProductsViewProps) {
  const [visibleItems, setVisibleItems] = useState(new Set<string>());
  const [search] = useQueryState("q", { defaultValue: "" });
  const observerRef = useRef<IntersectionObserver | null>(null);

  const products = (initialProducts || []).map((p) => ({
    id: p.id,
    name: p.name,
    category:
      typeof p.category === "object"
        ? (p.category as Category).name
        : "Uncategorized",
    description: p.description,
    image:
      (p.image as Media)?.url ||
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
    icon: <Beaker className="w-6 h-6" />,
    specs: p.specs?.map((s) => s.spec).filter((s): s is string => !!s) || [],
    applications:
      p.applications
        ?.map((a) => a.application)
        .filter((a): a is string => !!a) || [],
  }));

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            if (target.dataset.id) {
              setVisibleItems((prev) => new Set([...prev, target.dataset.id!]));
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      },
    );

    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => {
      if (observerRef.current) {
        observerRef.current.observe(el);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen transition-colors duration-500 bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50">
      {/* Products Grid Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Featured Products
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-gray-600">
            Explore our curated selection of premium chemicals, each designed to
            meet the highest industry standards
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                data-id={product.id.toString()}
                data-animate="true"
                className={`
                group rounded-2xl shadow-lg hover:shadow-2xl 
                transition-all duration-700 overflow-hidden border 
                transform hover:-translate-y-2 
                bg-white border-gray-100 hover:border-green-200 
                ${
                  visibleItems.has(product.id.toString())
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }
              `}
                style={{
                  transitionDelay: visibleItems.has(product.id.toString())
                    ? `${index * 100}ms`
                    : "0ms",
                }}
              >
                {/* Product Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                    {product.category}
                  </div>

                  {/* Icon */}
                  <div className="absolute top-4 right-4 p-2 rounded-full text-green-600 transform group-hover:rotate-12 transition-transform duration-300 shadow-lg bg-white/90 backdrop-blur-sm">
                    {product.icon}
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-6">
                  {/* Product Name */}
                  <h3 className="text-xl font-bold mb-2 group-hover:text-green-600 transition-colors duration-300 text-gray-900">
                    {product.name}
                  </h3>

                  {/* Product Description */}
                  <p className="mb-4 text-sm leading-relaxed text-gray-600">
                    {product.description}
                  </p>

                  {/* Specifications */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-2 text-gray-800">
                      Key Specifications:
                    </h4>
                    <div className="space-y-1">
                      {product.specs.map((spec, idx) => (
                        <div
                          key={idx}
                          className="text-xs flex items-center text-gray-600"
                        >
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2"></div>
                          {spec}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Applications */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold mb-2 text-gray-800">
                      Applications:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {product.applications.map((app, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 rounded-md border bg-green-50 text-green-700 border-green-200"
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center group-hover:shadow-lg shadow-green-500/25">
                    <span>Learn More</span>
                    <ChevronRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-emerald-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              No products found
            </h3>
            <p className="text-slate-500">
              We couldn&apos;t find any products matching &quot;{search}&quot;
            </p>
          </div>
        )}
      </div>

      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl animate-pulse bg-gradient-to-br from-blue-400/10 to-purple-400/10"></div>
        <div
          className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full blur-3xl animate-pulse bg-gradient-to-tr from-indigo-400/10 to-pink-400/10"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>
    </div>
  );
}
