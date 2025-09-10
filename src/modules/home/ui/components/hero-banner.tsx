"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatedCounter } from "./animated-counter";
import React, { useState, useEffect, useRef } from "react";
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
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
  const [statsVisible, setStatsVisible] = useState<boolean>(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const slides: Slide[] = [
    {
      title: "Advanced Chemical Solutions",
      subtitle: "Innovation in Every Molecule",
      description:
        "Cutting-edge compounds that power industries with precision, reliability, and breakthrough performance.",
      image: "/images/hero-banner-1.png",
      accent: "from-blue-600 to-cyan-500",
    },
    {
      title: "Sustainable Chemistry",
      subtitle: "Green Solutions for Tomorrow",
      description:
        "Eco-friendly processes that protect our planet while delivering exceptional efficiency and performance.",
      image: "/images/hero-banner-2.webp",
      accent: "from-green-600 to-emerald-500",
    },
    {
      title: "Laboratory Excellence",
      subtitle: "Precision Meets Innovation",
      description:
        "World-class laboratories and rigorous quality control ensure the highest manufacturing standards.",
      image: "/images/hero-banner-3.jpg",
      accent: "from-purple-600 to-indigo-500",
    },
  ];

  const stats: Stat[] = [
    { icon: Beaker, value: "500+", label: "Chemical Products" },
    { icon: Shield, value: "99.9%", label: "Safety Record" },
    { icon: Zap, value: "50+", label: "Years Experience" },
    { icon: Award, value: "200+", label: "Industry Awards" },
  ];

  // Initial load animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Stats visibility observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev: number) => (prev + 1) % slides.length);
        setIsTransitioning(false);
      }, 300);
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

  const handleSlideChange = (index: number) => {
    if (index !== currentSlide) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(index);
        setIsTransitioning(false);
      }, 300);
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes bounce-once {
          0%,
          20%,
          53%,
          80%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          40%,
          43% {
            transform: translate3d(0, -8px, 0) scale(1.05);
          }
          70% {
            transform: translate3d(0, -4px, 0) scale(1.02);
          }
          90% {
            transform: translate3d(0, -1px, 0) scale(1.01);
          }
        }

        .animate-bounce-once {
          animation: bounce-once 0.6s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fade-in-left {
          animation: fadeInLeft 0.8s ease-out forwards;
        }

        .animate-fade-in-right {
          animation: fadeInRight 0.8s ease-out forwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.8s ease-out forwards;
        }

        @media (max-width: 768px) {
          .mobile-bg-fixed {
            background-attachment: scroll;
            background-position: center center;
            background-size: cover;
            background-repeat: no-repeat;
          }
        }
      `}</style>

      <section className="relative min-h-screen lg:min-h-screen md:min-h-[85vh] sm:min-h-[80vh] overflow-hidden">
        {/* Dynamic Background Images - Improved Mobile Responsiveness */}
        <div className="absolute inset-0">
          {slides.map((slide, index) => (
            <div
              key={`bg-${index}`}
              className={`absolute inset-0 transition-all duration-700 ease-in-out mobile-bg-fixed ${
                currentSlide === index
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-105"
              }`}
            >
              {/* Mobile optimized background */}
              <div className="hidden md:block  absolute inset-0">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover object-center"
                  sizes="100vw"
                  priority={index === 0}
                  style={{
                    objectPosition: "center center",
                  }}
                />
              </div>

              {/* Desktop background */}
              <div className="hidden md:block">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority={index === 0}
                />
              </div>

              {/* Dynamic Gradient Overlay - Enhanced for mobile */}
              <div
                className="absolute inset-0 transition-all duration-700"
                style={{
                  background: `linear-gradient(135deg, 
                    rgba(0, 0, 0, 0.8) 0%, 
                    rgba(0, 0, 0, 0.6) 30%, 
                    rgba(0, 0, 0, 0.4) 70%, 
                    rgba(0, 0, 0, 0.7) 100%
                  )`,
                }}
              />

              {/* Mobile specific overlay for better text readability */}
              <div className="block md:hidden absolute inset-0 bg-black/30" />

              {/* Accent Color Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${slide.accent} opacity-20 mix-blend-multiply transition-all duration-700`}
              />
            </div>
          ))}

          {/* Base Gradient Overlay for better readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30" />
        </div>

        <div className="absolute inset-0 overflow-hidden">
          {/* Interactive Gradient Orb - Hidden on mobile for performance */}
          <div
            className={`hidden md:block absolute w-64 h-64 md:w-96 md:h-96 rounded-full bg-gradient-to-r from-white/10 to-white/5 blur-3xl transition-all duration-1000 ease-out ${
              hasLoaded ? "opacity-100" : "opacity-0"
            }`}
            style={{
              left: `${mousePosition.x * 0.02}%`,
              top: `${mousePosition.y * 0.02}%`,
            }}
          />

          {/* Grid Pattern - Simplified on mobile */}
          <div
            className={`absolute inset-0 opacity-5 md:opacity-10 transition-opacity duration-1000 ${
              hasLoaded ? "opacity-5 md:opacity-10" : "opacity-0"
            }`}
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "30px 30px",
              transitionDelay: "0.5s",
            }}
          />
          {/* Grid Pattern */}
          {/* <div
            className={`absolute inset-0 opacity-10 md:opacity-15 dark:opacity-15 md:dark:opacity-20 transition-opacity duration-1000 ${
              hasLoaded
                ? "opacity-10 md:opacity-15 dark:opacity-15 md:dark:opacity-20"
                : "opacity-0"
            }`}
            style={{
              backgroundImage: `
      linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
    `,
              backgroundSize: "30px 30px",
              transitionDelay: "0.5s",
            }}
          /> */}
        </div>

        {/* Main Content */}
        <div className="relative z-10 lg:ml-10 mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-20 pb-8 sm:pb-12 lg:pb-16 min-h-screen flex items-center">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center w-full">
            {/* Left Content */}
            <div
              className={`space-y-4 sm:space-y-6 lg:space-y-8 text-white order-2 lg:order-1 text-center md:text-left ${
                hasLoaded ? "animate-fade-in-left opacity-100" : "opacity-0"
              }`}
              style={{ animationDelay: "0.2s" }}
            >
              {/* Badge */}
              <div
                className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-sm font-medium ${
                  hasLoaded ? "animate-scale-in opacity-100" : "opacity-0"
                }`}
                style={{ animationDelay: "0.4s" }}
              >
                <Zap className="w-4 h-4 text-green-400" />
                <span className="hidden sm:inline">
                  Leading Chemical Innovation
                </span>
                <span className="sm:hidden">Innovation Leader</span>
              </div>

              {/* Main Heading - Compact for mobile */}
              <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                <h1
                  className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight transform transition-all duration-500 ease-in-out ${
                    isTransitioning
                      ? "opacity-0 translate-y-4 scale-95"
                      : "opacity-100 translate-y-0 scale-100"
                  } ${
                    hasLoaded ? "animate-fade-in-up opacity-100" : "opacity-0"
                  }`}
                  style={{ animationDelay: "0.6s" }}
                >
                  <span className="block text-white drop-shadow-lg">
                    {slides[currentSlide].title
                      .split(" ")
                      .slice(0, -1)
                      .join(" ")}
                  </span>
                  <span
                    className={`block bg-gradient-to-r ${slides[currentSlide].accent} bg-clip-text text-transparent font-black transition-all duration-500 ease-in-out drop-shadow-lg`}
                  >
                    {slides[currentSlide].title.split(" ").slice(-1)}
                  </span>
                </h1>
                <p
                  className={`hidden md:block text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 font-light transform transition-all duration-500 ease-in-out delay-75 drop-shadow-md ${
                    isTransitioning
                      ? "opacity-0 translate-y-4"
                      : "opacity-100 translate-y-0"
                  } ${
                    hasLoaded ? "animate-fade-in-up opacity-100" : "opacity-0"
                  }`}
                  style={{ animationDelay: "0.8s" }}
                >
                  {slides[currentSlide].subtitle}
                </p>
              </div>

              {/* Description - Hidden on mobile */}
              <p
                className={`hidden md:block text-base sm:text-lg text-white/80 leading-relaxed max-w-xl transform transition-all duration-500 ease-in-out delay-150 drop-shadow-sm ${
                  isTransitioning
                    ? "opacity-0 translate-y-4"
                    : "opacity-100 translate-y-0"
                } ${
                  hasLoaded ? "animate-fade-in-up opacity-100" : "opacity-0"
                }`}
                style={{ animationDelay: "1s" }}
              >
                {slides[currentSlide].description}
              </p>

              {/* CTA Buttons - Prominent on mobile */}
              <div
                className={`flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4 justify-center md:justify-start ${
                  hasLoaded ? "animate-fade-in-up opacity-100" : "opacity-0"
                }`}
                style={{ animationDelay: "1.2s" }}
              >
                <Link
                  href="/products"
                  className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-green-600 to-green-500 rounded-full text-white font-semibold text-base sm:text-lg hover:from-green-500 hover:to-green-400 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/25 overflow-hidden w-full sm:w-auto no-underline min-h-[3.25rem] sm:min-h-[3.5rem]"
                >
                  <span className="relative z-10 inline-flex items-center justify-center gap-2 w-full">
                    <span className="leading-none">Explore Products</span>
                    <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
                <button className="group flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 border-2 border-white/30 backdrop-blur-md rounded-full text-white font-semibold text-base sm:text-lg hover:border-green-400 hover:bg-green-400/20 transition-all duration-300 w-full sm:w-auto min-h-[3.25rem] sm:min-h-[3.5rem]">
                  <div className="w-7 sm:w-8 md:w-10 h-7 sm:h-8 md:h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-green-400/30 transition-colors duration-300 flex-shrink-0">
                    <Play className="w-3.5 sm:w-4 h-3.5 sm:h-4 ml-0.5" />
                  </div>
                  <span className="leading-none">Watch Demo</span>
                </button>
              </div>

              {/* Stats - Compact grid on mobile */}
              <div
                ref={statsRef}
                className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 pt-4 sm:pt-6 lg:pt-8 border-t border-white/20"
              >
                {stats.map((stat: Stat, index: number) => {
                  const Icon = stat.icon;
                  const hasPlus = stat.value.includes("+");
                  const hasPercent = stat.value.includes("%");

                  return (
                    <div
                      key={`stat-${index}`}
                      className={`text-center group cursor-pointer transform transition-all duration-700 ease-out ${
                        statsVisible
                          ? "translate-y-0 opacity-100"
                          : "translate-y-8 opacity-0"
                      } ${
                        hasLoaded
                          ? "animate-fade-in-up opacity-100"
                          : "opacity-0"
                      }`}
                      style={{
                        transitionDelay: `${index * 150 + 200}ms`,
                        animationDelay: `${index * 150 + 200}ms`,
                      }}
                    >
                      <div
                        className={`w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-1.5 sm:mb-2 lg:mb-3 group-hover:bg-white/20 transition-all duration-300 transform group-hover:scale-110 ${
                          statsVisible ? "animate-bounce-once" : ""
                        }`}
                        style={{
                          animationDelay: `${index * 200 + 600}ms`,
                          animationDuration: "0.6s",
                        }}
                      >
                        <Icon className="w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6 text-green-400" />
                      </div>

                      <div className="text-base sm:text-lg lg:text-2xl font-bold text-white drop-shadow-md">
                        <AnimatedCounter
                          endValue={stat.value}
                          hasPlus={hasPlus}
                          hasPercent={hasPercent}
                          duration={2000}
                        />
                      </div>

                      <div className="text-xs sm:text-sm text-white/70 drop-shadow-sm">
                        {stat.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Content - Simplified visual for mobile */}
            <div
              className={`relative order-1 lg:order-2 mb-6 lg:mb-0 ${
                hasLoaded ? "animate-fade-in-right opacity-100" : "opacity-0"
              }`}
              style={{ animationDelay: "0.3s" }}
            >
              {/* Main Visual Container - Smaller on mobile */}
              <div className="relative aspect-square max-w-[220px] sm:max-w-[280px] md:max-w-[320px] lg:max-w-[400px] mx-auto">
                {/* Background Image Container */}
                <div className="absolute inset-4 sm:inset-6 md:inset-8 lg:inset-12 rounded-full overflow-hidden border-2 sm:border-4 border-white/30 backdrop-blur-sm shadow-2xl">
                  <div className="relative w-full h-full">
                    <Image
                      src={slides[currentSlide].image}
                      alt={slides[currentSlide].title}
                      fill
                      className={`object-cover transition-all duration-500 ease-in-out ${
                        isTransitioning
                          ? "opacity-0 scale-110"
                          : "opacity-100 scale-100"
                      }`}
                      sizes="(max-width: 480px) 220px, (max-width: 640px) 280px, (max-width: 1024px) 320px, 400px"
                      priority
                    />
                    {/* Image Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].accent} opacity-30 transition-all duration-500`}
                    />
                  </div>
                </div>

                {/* Rotating Rings - Simplified on mobile */}
                <div
                  className={`absolute inset-0 animate-spin transition-opacity duration-1000 ${
                    hasLoaded ? "opacity-60" : "opacity-0"
                  }`}
                  style={{
                    animationDuration: "20s",
                    transitionDelay: "0.5s",
                  }}
                >
                  <div className="w-full h-full border border-white/30 rounded-full" />
                </div>
                <div
                  className={`hidden sm:block absolute inset-3 sm:inset-4 animate-spin transition-opacity duration-1000 ${
                    hasLoaded ? "opacity-40" : "opacity-0"
                  }`}
                  style={{
                    animationDuration: "15s",
                    animationDirection: "reverse",
                    transitionDelay: "0.7s",
                  }}
                >
                  <div className="w-full h-full border border-white/20 rounded-full border-dashed" />
                </div>

                {/* Central Logo Badge - Smaller on mobile */}
                <div
                  className={`absolute top-2 sm:top-4 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-xl rounded-full px-2 sm:px-3 py-1.5 sm:py-2 border border-white/30 transition-all duration-1000 ${
                    hasLoaded ? "scale-100 opacity-100" : "scale-75 opacity-0"
                  }`}
                  style={{ transitionDelay: "1.1s" }}
                >
                  <div className="flex items-center gap-1.5 sm:gap-2 text-white">
                    <Beaker className="w-3 sm:w-4 h-3 sm:h-4 text-green-400" />
                    <div className="text-xs sm:text-sm font-bold">
                      Cisco Chem
                    </div>
                  </div>
                </div>
              </div>

              {/* Slide Indicators - Smaller on mobile */}
              <div
                className={`flex justify-center space-x-2 sm:space-x-3 mt-3 sm:mt-4 md:mt-6 transition-all duration-1000 ${
                  hasLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: "1.5s" }}
              >
                {slides.map((_, index: number) => (
                  <button
                    key={`indicator-${index}`}
                    onClick={() => handleSlideChange(index)}
                    className={`w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full transition-all duration-300 ${
                      currentSlide === index
                        ? "bg-green-400 scale-125 shadow-lg shadow-green-400/50"
                        : "bg-white/50 hover:bg-white/70 hover:scale-110"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroBanner;
