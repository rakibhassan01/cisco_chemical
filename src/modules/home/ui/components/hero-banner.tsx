"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Play, Beaker, Shield, Zap, Award } from "lucide-react";
import { AnimatedCounter } from "./animated-counter";

interface Slide {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  accent: string;
  bgGradient: string;
}

interface Stat {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
}

const HeroBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const slides: Slide[] = [
    {
      title: "Advanced Chemical Solutions",
      subtitle: "Innovation in Every Molecule",
      description:
        "Cutting-edge compounds that power industries with precision, reliability, and breakthrough performance.",
      image: "/images/hero-banner-1.png",
      accent: "text-emerald-600",
      bgGradient: "from-emerald-50 via-white to-teal-50",
    },
    {
      title: "Sustainable Chemistry",
      subtitle: "Green Solutions for Tomorrow",
      description:
        "Eco-friendly processes that protect our planet while delivering exceptional efficiency and performance.",
      image: "/images/hero-banner-2.webp",
      accent: "text-green-600",
      bgGradient: "from-green-50 via-white to-emerald-50",
    },
    {
      title: "Laboratory Excellence",
      subtitle: "Precision Meets Innovation",
      description:
        "World-class laboratories and rigorous quality control ensure the highest manufacturing standards.",
      image: "/images/hero-banner-3.jpg",
      accent: "text-blue-600",
      bgGradient: "from-blue-50 via-white to-cyan-50",
    },
  ];

  const stats: Stat[] = [
    { icon: Beaker, value: "500+", label: "Chemical Products" },
    { icon: Shield, value: "99.9%", label: "Safety Record" },
    { icon: Zap, value: "50+", label: "Years Experience" },
    { icon: Award, value: "200+", label: "Industry Awards" },
  ];

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovered, slides.length]);

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden bg-white">
      {/* Dynamic Background Gradient */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${currentSlide}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].bgGradient} opacity-40`}
        />
      </AnimatePresence>

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-100 text-emerald-700 text-sm font-semibold mb-8"
            >
              <Zap className="w-4 h-4" />
              <span>Leading Chemical Innovation</span>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${currentSlide}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="space-y-6"
              >
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-slate-900 leading-[1.1]">
                  {slides[currentSlide].title.split(" ").slice(0, -1).join(" ")}{" "}
                  <span className={`${slides[currentSlide].accent}`}>
                    {slides[currentSlide].title.split(" ").slice(-1)}
                  </span>
                </h1>

                <p className="text-xl text-slate-600 font-medium leading-relaxed">
                  {slides[currentSlide].subtitle}
                </p>

                <p className="text-lg text-slate-500 leading-relaxed max-w-xl">
                  {slides[currentSlide].description}
                </p>
              </motion.div>
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 mt-10"
            >
              <Link
                href="/products"
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-emerald-600 rounded-xl text-white font-bold text-lg hover:bg-emerald-700 transition-all duration-300 shadow-xl shadow-emerald-200 hover:shadow-emerald-300 transform hover:-translate-y-1"
              >
                Explore Products
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button className="inline-flex items-center justify-center px-8 py-4 bg-white rounded-xl text-slate-700 font-bold text-lg border-2 border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all duration-300 group">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mr-3 group-hover:bg-emerald-200 transition-colors">
                  <Play className="w-4 h-4 text-emerald-600 fill-emerald-600 ml-0.5" />
                </div>
                Watch Demo
              </button>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-16 pt-10 border-t border-slate-100"
            >
              {stats.map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center gap-2 text-emerald-600 mb-1">
                    <stat.icon className="w-5 h-5" />
                    <span className="text-2xl font-bold text-slate-900">
                      <AnimatedCounter
                        endValue={stat.value}
                        hasPlus={stat.value.includes("+")}
                        hasPercent={stat.value.includes("%")}
                      />
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Visuals */}
          <div
            className="relative h-[400px] lg:h-[600px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`image-${currentSlide}`}
                initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full h-full"
              >
                {/* Main Image Mask */}
                <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-2xl shadow-emerald-200/50 border-[8px] border-white">
                  <Image
                    src={slides[currentSlide].image}
                    alt={slides[currentSlide].title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-emerald-900/10 mix-blend-overlay" />
                </div>

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-6 -right-6 p-6 bg-white rounded-2xl shadow-xl border border-slate-50 z-20"
                >
                  <Beaker className="w-8 h-8 text-emerald-600" />
                </motion.div>

                <motion.div
                  animate={{ y: [0, 20, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="absolute -bottom-6 -left-6 p-6 bg-white rounded-2xl shadow-xl border border-slate-50 z-20"
                >
                  <Award className="w-8 h-8 text-blue-600" />
                </motion.div>

                {/* Decorative Rings */}
                <div className="absolute -inset-10 border border-emerald-100 rounded-full opacity-50 scale-75 animate-[spin_20s_linear_infinite]" />
                <div className="absolute -inset-20 border border-blue-50 rounded-full opacity-30 scale-90 animate-[spin_30s_linear_infinite_reverse]" />
              </motion.div>
            </AnimatePresence>

            {/* Slide Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === idx
                      ? "w-8 bg-emerald-600"
                      : "w-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
