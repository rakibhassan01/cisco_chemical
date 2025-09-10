"use client";
import { useState, useEffect, useRef } from "react";
import {
  ChevronRight,
  Beaker,
  Atom,
  Zap,
  Shield,
  Leaf,
  Factory,
} from "lucide-react";
import Image from "next/image";

export function ProductsView() {
  const [visibleItems, setVisibleItems] = useState(new Set<string>());
  const observerRef = useRef<IntersectionObserver | null>(null);

  const products = [
    {
      id: 1,
      name: "Polyethylene Glycol (PEG)",
      category: "Polymers",
      description:
        "High-purity PEG for pharmaceutical and cosmetic applications with excellent solubility properties.",
      image:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
      icon: <Beaker className="w-6 h-6" />,
      specs: [
        "Molecular Weight: 200-8000",
        "Purity: >99%",
        "Viscosity: Variable",
      ],
      applications: ["Pharmaceuticals", "Cosmetics", "Food Industry"],
    },
    {
      id: 2,
      name: "Titanium Dioxide",
      category: "Pigments",
      description:
        "Premium grade titanium dioxide with superior opacity and brightness for industrial applications.",
      image:
        "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=400&h=300&fit=crop",
      icon: <Atom className="w-6 h-6" />,
      specs: [
        "TiO2 Content: >98%",
        "Particle Size: 0.2-0.3μm",
        "Oil Absorption: 15-25",
      ],
      applications: ["Paints & Coatings", "Plastics", "Paper"],
    },
    {
      id: 3,
      name: "Lithium Carbonate",
      category: "Battery Materials",
      description:
        "Battery-grade lithium carbonate for next-generation energy storage solutions.",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      icon: <Zap className="w-6 h-6" />,
      specs: [
        "Li2CO3: >99.5%",
        "Moisture: <0.5%",
        "Magnetic Substances: <50ppm",
      ],
      applications: ["Lithium Batteries", "Ceramics", "Glass"],
    },
    {
      id: 4,
      name: "Sodium Hypochlorite",
      category: "Disinfectants",
      description:
        "Industrial-strength disinfectant solution for water treatment and sanitization processes.",
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop",
      icon: <Shield className="w-6 h-6" />,
      specs: [
        "Available Chlorine: 10-15%",
        "pH: 11-13",
        "Stability: 12 months",
      ],
      applications: ["Water Treatment", "Bleaching", "Disinfection"],
    },
    {
      id: 5,
      name: "Bio-Surfactant Complex",
      category: "Green Chemistry",
      description:
        "Environmentally friendly surfactant derived from renewable sources for sustainable applications.",
      image:
        "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=400&h=300&fit=crop",
      icon: <Leaf className="w-6 h-6" />,
      specs: [
        "Biodegradability: >90%",
        "Surface Tension: 25-35 mN/m",
        "CMC: 0.1-0.5%",
      ],
      applications: ["Detergents", "Personal Care", "Agriculture"],
    },
    {
      id: 6,
      name: "Polyurethane Prepolymer",
      category: "Specialty Chemicals",
      description:
        "High-performance prepolymer for advanced coating and adhesive formulations.",
      image:
        "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=400&h=300&fit=crop",
      icon: <Factory className="w-6 h-6" />,
      specs: [
        "NCO Content: 15-25%",
        "Viscosity: 1000-5000 mPa·s",
        "Shelf Life: 6 months",
      ],
      applications: ["Coatings", "Adhesives", "Sealants"],
    },
  ];

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
      }
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

  return (
    <div className="min-h-screen transition-colors duration-500 bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900">
      {/* Products Grid Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Featured Products
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            Explore our curated selection of premium chemicals, each designed to
            meet the highest industry standards
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              data-id={product.id.toString()}
              data-animate="true"
              className={`
                group rounded-2xl shadow-lg hover:shadow-2xl 
                transition-all duration-700 overflow-hidden border 
                transform hover:-translate-y-2 
                bg-white border-gray-100 hover:border-green-200 
                dark:bg-gray-800/50 dark:backdrop-blur-sm dark:border-gray-700 dark:hover:border-green-500/50
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
                <div className="absolute top-4 right-4 p-2 rounded-full text-green-600 transform group-hover:rotate-12 transition-transform duration-300 shadow-lg bg-white/90 backdrop-blur-sm dark:bg-gray-800/90">
                  {product.icon}
                </div>
              </div>

              {/* Product Details */}
              <div className="p-6">
                {/* Product Name */}
                <h3 className="text-xl font-bold mb-2 group-hover:text-green-600 transition-colors duration-300 text-gray-900 dark:text-white">
                  {product.name}
                </h3>

                {/* Product Description */}
                <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  {product.description}
                </p>

                {/* Specifications */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-2 text-gray-800 dark:text-gray-200">
                    Key Specifications:
                  </h4>
                  <div className="space-y-1">
                    {product.specs.map((spec, idx) => (
                      <div
                        key={idx}
                        className="text-xs flex items-center text-gray-600 dark:text-gray-400"
                      >
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2"></div>
                        {spec}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Applications */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold mb-2 text-gray-800 dark:text-gray-200">
                    Applications:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {product.applications.map((app, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 rounded-md border bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800"
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
      </div>

      {/* CTA Section */}

      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl animate-pulse bg-gradient-to-br from-blue-400/10 to-purple-400/10 dark:from-slate-400/5 dark:to-gray-400/5"></div>
        <div
          className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full blur-3xl animate-pulse bg-gradient-to-tr from-indigo-400/10 to-pink-400/10 dark:from-gray-400/5 dark:to-slate-400/5"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>
    </div>
  );
}
