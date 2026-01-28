"use client";

import React from "react";
import { motion } from "framer-motion";

export const ScientificOverlay: React.FC = () => {
  // Deterministic positions for data points to avoid hydration mismatch
  const points = [
    { top: 15, left: 10, delay: 0, duration: 4 },
    { top: 25, left: 85, delay: 1, duration: 5 },
    { top: 45, left: 15, delay: 2, duration: 3.5 },
    { top: 65, left: 75, delay: 0.5, duration: 6 },
    { top: 85, left: 25, delay: 1.5, duration: 4.5 },
    { top: 5, left: 65, delay: 2.5, duration: 5.5 },
    { top: 55, left: 95, delay: 3, duration: 4 },
    { top: 95, left: 55, delay: 1.2, duration: 5 },
    { top: 35, left: 5, delay: 2.2, duration: 4.2 },
    { top: 75, left: 45, delay: 0.8, duration: 5.2 },
    { top: 12, left: 42, delay: 1.8, duration: 3.8 },
    { top: 52, left: 22, delay: 2.8, duration: 4.8 },
    { top: 82, left: 82, delay: 0.2, duration: 5.8 },
    { top: 22, left: 52, delay: 1.2, duration: 4.1 },
    { top: 62, left: 62, delay: 2.1, duration: 3.9 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none opacity-20">
      {/* Hexagonal Grid Pattern */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="hexagons"
            width="50"
            height="43.4"
            patternUnits="userSpaceOnUse"
            patternTransform="scale(2)"
          >
            <path
              d="M25 0L50 14.4V43.4L25 57.8L0 43.4V14.4L25 0Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-emerald-500/20"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagons)" />
      </svg>

      {/* Animated Coordinate Lines */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`line-h-${i}`}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: [0, 0.4, 0] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 2,
              ease: "linear",
            }}
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent"
            style={{ top: `${20 * (i + 1)}%` }}
          />
        ))}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`line-v-${i}`}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: [0, 0.4, 0] }}
            transition={{
              duration: 10,
              repeat: Infinity,
              delay: i * 2.5,
              ease: "linear",
            }}
            className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500/10 to-transparent"
            style={{ left: `${20 * (i + 1)}%` }}
          />
        ))}
      </div>

      {/* Subtle Data Points */}
      <div className="absolute inset-0">
        {points.map((pt, i) => (
          <motion.div
            key={`point-${i}`}
            animate={{
              opacity: [0.05, 0.4, 0.05],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: pt.duration,
              repeat: Infinity,
              delay: pt.delay,
            }}
            className="absolute w-1 h-1 bg-emerald-500 rounded-full"
            style={{
              top: `${pt.top}%`,
              left: `${pt.left}%`,
            }}
          />
        ))}
      </div>

      {/* Large Blurred Background Glows */}
      <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-emerald-500/5 rounded-full blur-[120px]" />
      <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-500/5 rounded-full blur-[120px]" />
    </div>
  );
};
