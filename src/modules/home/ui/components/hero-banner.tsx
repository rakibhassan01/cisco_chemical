"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Play,
  Beaker,
  Shield,
  Zap,
  Award,
  Microscope,
  FlaskConical,
  Atom,
} from "lucide-react";
import { AnimatedCounter } from "./animated-counter";
import { ScientificOverlay } from "./scientific-overlay";

interface Slide {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  accent: string;
  bgGradient: string;
  icon: React.ElementType;
}

interface Stat {
  icon: React.ElementType;
  value: string;
  label: string;
}

const HeroBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [progress, setProgress] = useState(0);

  const slides: Slide[] = [
    {
      title: "Advanced Chemical Engineering",
      subtitle: "Precision. Innovation. Excellence.",
      description:
        "Developing high-purity compounds and innovative chemical solutions that empower global industries through scientific rigor and advanced manufacturing.",
      image: "/images/hero-lab.png",
      accent: "text-emerald-700",
      bgGradient: "from-white via-white/80 to-transparent",
      icon: Microscope,
    },
    {
      title: "Industrial Scale Solutions",
      subtitle: "Powering Global Infrastructure",
      description:
        "Our state-of-the-art manufacturing facilities deliver consistent quality and massive scale for the world's most demanding industrial applications.",
      image: "/images/hero-industrial.png",
      accent: "text-blue-700",
      bgGradient: "from-white via-white/80 to-transparent",
      icon: Factory,
    },
    {
      title: "Molecular Research & Design",
      subtitle: "The Future of Material Science",
      description:
        "Pushing the boundaries of chemistry to create sustainable, high-performance materials through advanced molecular modeling and research.",
      image: "/images/hero-molecular.png",
      accent: "text-cyan-700",
      bgGradient: "from-white via-white/80 to-transparent",
      icon: Atom,
    },
  ];

  const stats: Stat[] = [
    { icon: Beaker, value: "500+", label: "Research Compounds" },
    { icon: Shield, value: "99.9%", label: "Quality Assurance" },
    { icon: Zap, value: "50+", label: "Global Patents" },
    { icon: Award, value: "25+", label: "Industry Certifications" },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgress(0);
  }, [slides.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + 0.5;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative h-[90vh] lg:h-screen w-full flex items-center pt-20 lg:pt-24 overflow-hidden bg-white text-slate-900 border-b border-slate-100">
      {/* Immersive Background Layer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-image-${currentSlide}`}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            fill
            className="object-cover"
            priority
          />
          {/* Immersive white gradient overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-r ${slides[currentSlide].bgGradient} z-10`}
          />
        </motion.div>
      </AnimatePresence>

      {/* Technical Overlay - Stays on top of images but below text */}
      <div className="absolute inset-0 z-20">
        <ScientificOverlay />
      </div>

      <div className="container relative z-30 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full border border-emerald-100/50 text-emerald-700 text-[10px] font-bold tracking-[0.2em] uppercase mb-10 shadow-sm"
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Pioneering Science</span>
          </motion.div>

          {/* Dynamic Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${currentSlide}`}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              <h1 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-bold leading-[0.9] tracking-tighter text-slate-950">
                <span className="block opacity-90 drop-shadow-sm">
                  {slides[currentSlide].title.split(" ").slice(0, -2).join(" ")}
                </span>
                <span
                  className={`${slides[currentSlide].accent} block drop-shadow-sm`}
                >
                  {slides[currentSlide].title.split(" ").slice(-2).join(" ")}
                </span>
              </h1>

              <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 pt-4 items-start">
                <p className="lg:col-span-7 text-xl lg:text-3xl text-slate-800 font-semibold leading-tight border-l-4 border-emerald-500 pl-6">
                  {slides[currentSlide].subtitle}
                </p>
                <p className="lg:col-span-5 text-lg text-slate-500 font-medium leading-relaxed max-w-md">
                  {slides[currentSlide].description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-5 mt-16"
          >
            <Link
              href="/products"
              className="group relative inline-flex items-center justify-center px-10 py-5 bg-emerald-600 rounded-[2rem] text-white font-bold text-lg hover:bg-emerald-700 transition-all duration-500 shadow-2xl shadow-emerald-200 active:scale-95 overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Explore Solutions
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>

            <button className="inline-flex items-center justify-center px-10 py-5 bg-white/50 backdrop-blur-xl rounded-[2rem] text-slate-700 font-bold text-lg border-2 border-white hover:border-emerald-200 hover:bg-white/80 transition-all duration-500 active:scale-95 group shadow-lg">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mr-3 group-hover:bg-emerald-200 transition-colors">
                <Play className="w-4 h-4 text-emerald-600 fill-emerald-600 ml-0.5" />
              </div>
              Innovation Deck
            </button>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-12 mt-20 pt-12 border-t border-slate-200/50"
          >
            {stats.map((stat, idx) => (
              <div key={idx} className="group cursor-default">
                <div className="flex items-center gap-3 mb-1">
                  <div className="p-2 bg-emerald-50 rounded-xl group-hover:bg-emerald-100 transition-colors">
                    <stat.icon className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-3xl font-black text-slate-950 tracking-tight">
                    <AnimatedCounter
                      endValue={stat.value}
                      hasPlus={stat.value.includes("+")}
                      hasPercent={stat.value.includes("%")}
                    />
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-black uppercase tracking-[0.15em] pl-1 group-hover:text-emerald-700 transition-colors">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Floating Interactive Elements */}
      <div className="absolute bottom-16 right-16 z-40 hidden 2xl:flex flex-col items-end gap-10">
        {/* Info Card */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="p-8 bg-white/80 backdrop-blur-3xl rounded-[2.5rem] border border-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] flex items-center gap-8 group"
        >
          <div className="space-y-1.5">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-600 group-hover:tracking-[0.3em] transition-all">
              Live Network
            </p>
            <p className="text-2xl font-black text-slate-950 leading-none">
              ISO Phase-012
            </p>
          </div>
          <div className="w-16 h-16 bg-slate-950 rounded-3xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
            {React.createElement(slides[currentSlide].icon, {
              className: "w-8 h-8 text-emerald-400",
            })}
          </div>
        </motion.div>

        {/* Global Progress & Nav */}
        <div className="flex items-center gap-8">
          <div className="flex gap-3">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentSlide(idx);
                  setProgress(0);
                }}
                className={`h-2 rounded-full transition-all duration-700 ${
                  currentSlide === idx
                    ? "w-16 bg-emerald-600 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                    : "w-4 bg-slate-200 hover:bg-slate-300"
                }`}
              />
            ))}
          </div>
          <div className="relative w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-slate-50 overflow-hidden">
            <svg className="w-full h-full p-2 origin-center -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="30"
                className="stroke-slate-50"
                strokeWidth="1.5"
                fill="none"
                transform="translate(4,4)"
              />
              <motion.circle
                cx="32"
                cy="32"
                r="30"
                className="stroke-emerald-600"
                strokeWidth="2.5"
                fill="none"
                strokeDasharray="188.5"
                strokeDashoffset={188.5 - (188.5 * progress) / 100}
                transform="translate(4,4)"
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute text-xl font-black text-slate-900 leading-none">
              0{currentSlide + 1}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

const Factory: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2 20V9l9-2 10 2v11" />
    <path d="M9 20V9" />
    <path d="M17 20V9" />
    <rect x="2" y="20" width="20" height="2" />
    <path d="M11 7V3" />
    <path d="M15 9V5" />
    <path d="M7 9V5" />
  </svg>
);

export default HeroBanner;
