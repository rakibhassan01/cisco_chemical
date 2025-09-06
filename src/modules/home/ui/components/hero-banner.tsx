"use client";

import React, { useState, useEffect } from "react";
import { ChevronRight, Play, Beaker, Shield, Zap, Award } from "lucide-react";

interface Slide {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  accent: string;
}

interface Stat {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
}

interface MousePosition {
  x: number;
  y: number;
}

const HeroBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });

  const slides: Slide[] = [
    {
      title: "Advanced Chemical Solutions",
      subtitle: "Pioneering Innovation in Every Molecule",
      description:
        "Discover cutting-edge chemical compounds and solutions that drive industries forward with unmatched quality and precision.",
      image: "/api/placeholder/800/600",
      accent: "from-blue-600 to-cyan-500",
    },
    {
      title: "Sustainable Chemistry",
      subtitle: "Green Solutions for Tomorrow",
      description:
        "Leading the way in eco-friendly chemical processes that protect our planet while delivering exceptional performance.",
      image: "/api/placeholder/800/600",
      accent: "from-green-600 to-emerald-500",
    },
    {
      title: "Laboratory Excellence",
      subtitle: "Precision Meets Innovation",
      description:
        "State-of-the-art laboratory facilities and rigorous quality control ensure the highest standards in chemical manufacturing.",
      image: "/api/placeholder/800/600",
      accent: "from-purple-600 to-indigo-500",
    },
  ];

  const stats: Stat[] = [
    { icon: Beaker, value: "500+", label: "Chemical Products" },
    { icon: Shield, value: "99.9%", label: "Safety Record" },
    { icon: Zap, value: "50+", label: "Years Experience" },
    { icon: Award, value: "200+", label: "Industry Awards" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev: number) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 100,
        y: (event.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-gray-50 dark:from-slate-900 dark:via-gray-900 dark:to-black transition-colors duration-300">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Molecules */}
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={`molecule-${i}`}
            className="absolute w-2 h-2 bg-green-400/30 dark:bg-green-400/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}

        {/* Interactive Gradient Orb */}
        <div
          className="absolute w-64 h-64 md:w-96 md:h-96 rounded-full bg-gradient-to-r from-green-500/20 to-blue-500/20 dark:from-green-500/10 dark:to-blue-500/10 blur-3xl transition-all duration-1000 ease-out"
          style={{
            left: `${mousePosition.x * 0.02}%`,
            top: `${mousePosition.y * 0.02}%`,
          }}
        />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-10 dark:opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 197, 94, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 197, 94, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-16 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 text-gray-900 dark:text-white order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-green-500/20 dark:bg-green-500/10 border border-green-500/30 dark:border-green-500/20 rounded-full text-green-700 dark:text-green-400 text-sm font-medium backdrop-blur-sm">
              <Zap className="w-4 h-4" />
              <span className="hidden sm:inline">
                Leading Chemical Innovation
              </span>
              <span className="sm:hidden">Innovation Leader</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="block bg-gradient-to-r from-gray-900 via-green-600 to-green-500 dark:from-white dark:via-green-200 dark:to-green-400 bg-clip-text text-transparent">
                  {slides[currentSlide].title.split(" ").slice(0, -1).join(" ")}
                </span>
                <span
                  className={`block bg-gradient-to-r ${slides[currentSlide].accent} bg-clip-text text-transparent font-black`}
                >
                  {slides[currentSlide].title.split(" ").slice(-1)}
                </span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 font-light">
                {slides[currentSlide].subtitle}
              </p>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
              {slides[currentSlide].description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-600 to-green-500 rounded-full text-white font-semibold text-base sm:text-lg hover:from-green-500 hover:to-green-400 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/25 overflow-hidden w-full sm:w-auto">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span className="hidden sm:inline">Explore Products</span>
                  <span className="sm:hidden">Products</span>
                  <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>

              <button className="group flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 border-2 border-gray-300 dark:border-white/20 rounded-full text-gray-900 dark:text-white font-semibold text-base sm:text-lg hover:border-green-400 hover:bg-green-400/10 transition-all duration-300 backdrop-blur-sm w-full sm:w-auto">
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gray-200/50 dark:bg-white/10 rounded-full flex items-center justify-center group-hover:bg-green-400/20 transition-colors duration-300">
                  <Play className="w-4 sm:w-5 h-4 sm:h-5 ml-1" />
                </div>
                <span className="hidden sm:inline">Watch Demo</span>
                <span className="sm:hidden">Demo</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-gray-200 dark:border-white/10">
              {stats.map((stat: Stat, index: number) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={`stat-${index}`}
                    className="text-center group cursor-pointer"
                  >
                    <div className="w-10 sm:w-12 h-10 sm:h-12 bg-green-500/20 dark:bg-green-500/10 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:bg-green-500/30 dark:group-hover:bg-green-500/20 transition-colors duration-300">
                      <Icon className="w-5 sm:w-6 h-5 sm:h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Content - Visual Element */}
          <div className="relative order-1 lg:order-2 mb-8 lg:mb-0">
            {/* Main Visual Container */}
            <div className="relative aspect-square max-w-sm sm:max-w-md lg:max-w-lg mx-auto">
              {/* Rotating Rings */}
              <div
                className="absolute inset-0 animate-spin"
                style={{ animationDuration: "20s" }}
              >
                <div className="w-full h-full border-2 border-green-400/30 dark:border-green-400/20 rounded-full" />
              </div>
              <div
                className="absolute inset-4 sm:inset-8 animate-spin"
                style={{
                  animationDuration: "15s",
                  animationDirection: "reverse",
                }}
              >
                <div className="w-full h-full border-2 border-blue-400/30 dark:border-blue-400/20 rounded-full border-dashed" />
              </div>
              <div
                className="absolute inset-8 sm:inset-16 animate-spin"
                style={{ animationDuration: "25s" }}
              >
                <div className="w-full h-full border border-purple-400/30 dark:border-purple-400/20 rounded-full" />
              </div>

              {/* Central Element */}
              <div className="absolute inset-12 sm:inset-24 bg-gradient-to-br from-green-500/30 to-blue-500/30 dark:from-green-500/20 dark:to-blue-500/20 rounded-full backdrop-blur-xl flex items-center justify-center border border-gray-300/50 dark:border-white/10">
                <div className="text-center text-gray-900 dark:text-white">
                  <Beaker className="w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-2 sm:mb-4 text-green-600 dark:text-green-400 animate-pulse" />
                  <div className="text-xl sm:text-2xl font-bold">Cisco</div>
                  <div className="text-base sm:text-lg text-green-600 dark:text-green-400">
                    Chemistry
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              {Array.from({ length: 8 }, (_, i) => (
                <div
                  key={`floating-${i}`}
                  className="absolute w-3 sm:w-4 h-3 sm:h-4 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-pulse"
                  style={{
                    left: `${20 + Math.cos((i * Math.PI) / 4) * 40}%`,
                    top: `${20 + Math.sin((i * Math.PI) / 4) * 40}%`,
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center space-x-3 mt-6 sm:mt-8">
              {slides.map((_, index: number) => (
                <button
                  key={`indicator-${index}`}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? "bg-green-500 dark:bg-green-400 scale-125"
                      : "bg-gray-400/50 dark:bg-white/30 hover:bg-gray-500/70 dark:hover:bg-white/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-gray-600 dark:text-white/60 animate-bounce">
        {/* <div className="text-xs sm:text-sm mb-2 text-center">
          Scroll to explore
        </div> */}
        <div className="w-5 sm:w-6 h-8 sm:h-10 border-2 border-gray-400 dark:border-white/30 rounded-full mx-auto flex justify-center">
          <div className="w-1 h-2 sm:h-3 bg-gray-600 dark:bg-white/60 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
