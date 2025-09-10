"use client";

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

interface AnimatedCounterProps {
  endValue: string;
  duration?: number;
  hasPlus?: boolean;
  hasPercent?: boolean;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  endValue,
  duration = 2000,
  hasPlus = false,
  // hasPercent = false,
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const numericValue = parseInt(endValue.replace(/[^\d]/g, ""));
    let startTime: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easeOutCubic * numericValue);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, endValue, duration]);

  const formatCount = (value: number): string => {
    if (endValue.includes("K")) {
      if (value >= 1000) {
        return Math.floor(value / 1000) + "K";
      }
      return value.toString();
    }
    return value.toString();
  };

  const displayValue =
    endValue.includes("/") || endValue.includes("%")
      ? endValue
      : formatCount(count) + (hasPlus ? "+" : "");
  const suffix = "";

  return (
    <span ref={elementRef} className="inline-block">
      {displayValue}
      {suffix}
    </span>
  );
};

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

  // const slides: Slide[] = [
  //   {
  //     title: "Advanced Chemical Solutions",
  //     subtitle: "Pioneering Innovation in Every Molecule",
  //     description:
  //       "Discover cutting-edge chemical compounds and solutions that drive industries forward with unmatched quality and precision.",
  //     image: "/api/placeholder/800/600",
  //     accent: "from-blue-600 to-cyan-500",
  //   },
  //   {
  //     title: "Sustainable Chemistry",
  //     subtitle: "Green Solutions for Tomorrow",
  //     description:
  //       "Leading the way in eco-friendly chemical processes that protect our planet while delivering exceptional performance.",
  //     image: "/api/placeholder/800/600",
  //     accent: "from-green-600 to-emerald-500",
  //   },
  //   {
  //     title: "Laboratory Excellence",
  //     subtitle: "Precision Meets Innovation",
  //     description:
  //       "State-of-the-art laboratory facilities and rigorous quality control ensure the highest standards in chemical manufacturing.",
  //     image: "/api/placeholder/800/600",
  //     accent: "from-purple-600 to-indigo-500",
  //   },
  // ];
  const slides: Slide[] = [
    {
      title: "Advanced Chemical Solutions",
      subtitle: "Innovation in Every Molecule",
      description:
        "Cutting-edge compounds that power industries with precision, reliability, and breakthrough performance.",
      image: "/images/Homepage-Carousel.webp",
      accent: "from-blue-600 to-cyan-500",
      // cta: { label: "Explore Products", href: "/products" },
    },
    {
      title: "Sustainable Chemistry",
      subtitle: "Green Solutions for Tomorrow",
      description:
        "Eco-friendly processes that protect our planet while delivering exceptional efficiency and performance.",
      image: "/images/green-chemistry.jpg",
      accent: "from-green-600 to-emerald-500",
      // cta: { label: "Learn More", href: "/sustainability" },
    },
    {
      title: "Laboratory Excellence",
      subtitle: "Precision Meets Innovation",
      description:
        "World-class laboratories and rigorous quality control ensure the highest manufacturing standards.",
      image: "/images/lab-excellence.jpg",
      accent: "from-purple-600 to-indigo-500",
      // cta: { label: "Our Facilities", href: "/labs" },
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
      `}</style>

      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-gray-50 dark:from-slate-900 dark:via-gray-900 dark:to-black transition-colors duration-300">
        {/* <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-gray-50 dark:from-slate-900 dark:via-gray-900 dark:to-black transition-colors duration-300 pt-16 lg:pt-20"> */}
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Molecules */}
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={`molecule-${i}`}
              className={`absolute w-2 h-2 bg-green-400/30 dark:bg-green-400/20 rounded-full animate-pulse ${
                hasLoaded ? "opacity-100" : "opacity-0"
              } transition-opacity duration-1000`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3 + 1}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
                transitionDelay: `${i * 50}ms`,
              }}
            />
          ))}

          {/* Interactive Gradient Orb */}
          <div
            className={`absolute w-64 h-64 md:w-96 md:h-96 rounded-full bg-gradient-to-r from-green-500/20 to-blue-500/20 dark:from-green-500/10 dark:to-blue-500/10 blur-3xl transition-all duration-1000 ease-out ${
              hasLoaded ? "opacity-100" : "opacity-0"
            }`}
            style={{
              left: `${mousePosition.x * 0.02}%`,
              top: `${mousePosition.y * 0.02}%`,
            }}
          />

          {/* Grid Pattern */}
          <div
            className={`absolute inset-0 opacity-10 dark:opacity-5 transition-opacity duration-1000 ${
              hasLoaded ? "opacity-10 dark:opacity-5" : "opacity-0"
            }`}
            style={{
              backgroundImage: `
                linear-gradient(rgba(34, 197, 94, 0.2) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34, 197, 94, 0.2) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
              transitionDelay: "0.5s",
            }}
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-16 min-h-screen flex items-center">
          {/* <div className="relative z-10  max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 min-h-[calc(100vh-80px)] flex items-center"> */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
            {/* Left Content */}
            <div
              className={`space-y-6 sm:space-y-8 text-gray-900 dark:text-white order-2 lg:order-1 ${
                hasLoaded ? "animate-fade-in-left opacity-100" : "opacity-0"
              }`}
              style={{ animationDelay: "0.2s" }}
            >
              {/* Badge */}
              <div
                className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-green-500/20 dark:bg-green-500/10 border border-green-500/30 dark:border-green-500/20 rounded-full text-green-700 dark:text-green-400 text-sm font-medium backdrop-blur-sm ${
                  hasLoaded ? "animate-scale-in opacity-100" : "opacity-0"
                }`}
                style={{ animationDelay: "0.4s" }}
              >
                <Zap className="w-4 h-4" />
                <span className="hidden sm:inline">
                  Leading Chemical Innovation
                </span>
                <span className="sm:hidden">Innovation Leader</span>
              </div>

              {/* Main Heading - with smooth transitions */}
              <div className="space-y-3 sm:space-y-4">
                <h1
                  className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight transform transition-all duration-500 ease-in-out ${
                    isTransitioning
                      ? "opacity-0 translate-y-4 scale-95"
                      : "opacity-100 translate-y-0 scale-100"
                  } ${
                    hasLoaded ? "animate-fade-in-up opacity-100" : "opacity-0"
                  }`}
                  style={{ animationDelay: "0.6s" }}
                >
                  <span className="block bg-gradient-to-r from-gray-900 via-green-600 to-green-500 dark:from-white dark:via-green-200 dark:to-green-400 bg-clip-text text-transparent">
                    {slides[currentSlide].title
                      .split(" ")
                      .slice(0, -1)
                      .join(" ")}
                  </span>
                  <span
                    className={`block bg-gradient-to-r ${slides[currentSlide].accent} bg-clip-text text-transparent font-black transition-all duration-500 ease-in-out`}
                  >
                    {slides[currentSlide].title.split(" ").slice(-1)}
                  </span>
                </h1>
                <p
                  className={`text-lg sm:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 font-light transform transition-all duration-500 ease-in-out delay-75 ${
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

              {/* Description */}
              <p
                className={`text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl transform transition-all duration-500 ease-in-out delay-150 ${
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

              {/* CTA Buttons */}
              <div
                className={`flex flex-col sm:flex-row gap-4 pt-4 ${
                  hasLoaded ? "animate-fade-in-up opacity-100" : "opacity-0"
                }`}
                style={{ animationDelay: "1.2s" }}
              >
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
              <div
                ref={statsRef}
                className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-gray-200 dark:border-white/10"
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
                      // style={{
                      //   transitionDelay: `${index * 150 + 1400}ms`,
                      //   animationDelay: `${index * 150 + 1400}ms`,
                      // }}
                      style={{
                        transitionDelay: `${index * 150 + 200}ms`,
                        animationDelay: `${index * 150 + 200}ms`,
                      }}
                    >
                      <div
                        className={`w-10 sm:w-12 h-10 sm:h-12 bg-green-500/20 dark:bg-green-500/10 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:bg-green-500/30 dark:group-hover:bg-green-500/20 transition-all duration-300 transform group-hover:scale-110 ${
                          statsVisible ? "animate-bounce-once" : ""
                        }`}
                        style={{
                          animationDelay: `${index * 200 + 600}ms`,
                          animationDuration: "0.6s",
                        }}
                      >
                        <Icon className="w-5 sm:w-6 h-5 sm:h-6 text-green-600 dark:text-green-400" />
                      </div>

                      <div className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                        <AnimatedCounter
                          endValue={stat.value}
                          hasPlus={hasPlus}
                          hasPercent={hasPercent}
                          duration={2000}
                        />
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
            <div
              className={`relative order-1 lg:order-2 mb-8 lg:mb-0 ${
                hasLoaded ? "animate-fade-in-right opacity-100" : "opacity-0"
              }`}
              style={{ animationDelay: "0.3s" }}
            >
              {/* Main Visual Container */}
              <div className="relative aspect-square max-w-sm sm:max-w-md lg:max-w-lg mx-auto">
                {/* Rotating Rings */}
                <div
                  className={`absolute inset-0 animate-spin transition-opacity duration-1000 ${
                    hasLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    animationDuration: "20s",
                    transitionDelay: "0.5s",
                  }}
                >
                  <div className="w-full h-full border-2 border-green-400/30 dark:border-green-400/20 rounded-full" />
                </div>
                <div
                  className={`absolute inset-4 sm:inset-8 animate-spin transition-opacity duration-1000 ${
                    hasLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    animationDuration: "15s",
                    animationDirection: "reverse",
                    transitionDelay: "0.7s",
                  }}
                >
                  <div className="w-full h-full border-2 border-blue-400/30 dark:border-blue-400/20 rounded-full border-dashed" />
                </div>
                <div
                  className={`absolute inset-8 sm:inset-16 animate-spin transition-opacity duration-1000 ${
                    hasLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    animationDuration: "25s",
                    transitionDelay: "0.9s",
                  }}
                >
                  <div className="w-full h-full border border-purple-400/30 dark:border-purple-400/20 rounded-full" />
                </div>

                {/* Central Element */}
                <div
                  className={`absolute inset-12 sm:inset-24 bg-gradient-to-br from-green-500/30 to-blue-500/30 dark:from-green-500/20 dark:to-blue-500/20 rounded-full backdrop-blur-xl flex items-center justify-center border border-gray-300/50 dark:border-white/10 transition-all duration-1000 ${
                    hasLoaded ? "scale-100 opacity-100" : "scale-75 opacity-0"
                  }`}
                  style={{ transitionDelay: "1.1s" }}
                >
                  <div className="text-center text-gray-900 dark:text-white">
                    <Beaker className="w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-2 sm:mb-4 text-green-600 dark:text-green-400 animate-pulse" />
                    <div className="text-xl sm:text-2xl font-bold">Cisco</div>
                    <div className="text-base sm:text-lg text-green-600 dark:text-green-400">
                      Chemical
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                {Array.from({ length: 8 }, (_, i) => (
                  <div
                    key={`floating-${i}`}
                    className={`absolute w-3 sm:w-4 h-3 sm:h-4 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-pulse transition-all duration-1000 ${
                      hasLoaded ? "scale-100 opacity-100" : "scale-0 opacity-0"
                    }`}
                    style={{
                      left: `${20 + Math.cos((i * Math.PI) / 4) * 40}%`,
                      top: `${20 + Math.sin((i * Math.PI) / 4) * 40}%`,
                      animationDelay: `${i * 0.2}s`,
                      transitionDelay: `${1.3 + i * 0.1}s`,
                    }}
                  />
                ))}
              </div>

              {/* Slide Indicators */}
              <div
                className={`flex justify-center space-x-3 mt-6 sm:mt-8 transition-all duration-1000 ${
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
                    className={`w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full transition-all duration-300 ${
                      currentSlide === index
                        ? "bg-green-500 dark:bg-green-400 scale-125 shadow-lg shadow-green-500/50"
                        : "bg-gray-400/50 dark:bg-white/30 hover:bg-gray-500/70 dark:hover:bg-white/50 hover:scale-110"
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
