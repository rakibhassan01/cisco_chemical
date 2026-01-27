"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  FlaskConical,
  Beaker,
  Orbit,
  ArrowLeft,
  Atom,
  Droplets,
} from "lucide-react";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated Background Bubbles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-green-500/10 dark:bg-green-400/5 rounded-full blur-xl animate-bubble"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: "-50px",
              width: `${Math.random() * 80 + 20}px`,
              height: `${Math.random() * 80 + 20}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-2xl w-full text-center py-20">
        {/* Main 404 Visual */}
        <div className="relative mb-12 inline-block">
          <div className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500 animate-pulse tracking-tighter">
            404
          </div>

          {/* Floating Chemical Icons */}
          <div className="absolute -top-10 -left-10 animate-float-slow">
            <FlaskConical className="w-12 h-12 text-green-500/40 rotate-12" />
          </div>
          <div className="absolute -bottom-8 -right-12 animate-float">
            <Beaker className="w-14 h-14 text-emerald-500/30 -rotate-12" />
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-16 animate-spin-slow">
            <Orbit className="w-10 h-10 text-green-400/20" />
          </div>
          <div className="absolute -top-4 -right-10 animate-bounce-subtle">
            <Atom className="w-8 h-8 text-green-600/30" />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Reaction <span className="text-green-600">Failed</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
            The molecular bond to this page has been broken. The requested
            component might have evaporated or never existed in our laboratory.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link
              href="/"
              className="group flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Back to Laboratory
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-6 py-4 transition-colors font-medium"
            >
              <Droplets className="w-5 h-5 animate-bounce-subtle" />
              Rerun Experiment
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes bubble {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-800px) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(-12deg);
          }
          50% {
            transform: translateY(-20px) rotate(-5deg);
          }
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0) rotate(12deg);
          }
          50% {
            transform: translateY(-15px) rotate(20deg);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes bounce-subtle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-bubble {
          animation: bubble linear infinite;
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
