import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  endValue: string;
  duration?: number;
  hasPlus?: boolean;
  hasPercent?: boolean;
}
export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  endValue,
  duration = 2000,
  hasPlus = false,
  hasPercent = false,
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

    const numericValue = hasPercent
      ? parseFloat(endValue.replace(/[^\d.]/g, "")) // Use parseFloat for decimals
      : parseInt(endValue.replace(/[^\d]/g, "")); // Use parseInt for whole numbers
    let startTime: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentCount = hasPercent
        ? parseFloat((easeOutCubic * numericValue).toFixed(1)) // Keep 1 decimal place
        : Math.floor(easeOutCubic * numericValue); // Whole numbers only

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, endValue, duration, hasPercent]);

  const formatCount = (value: number): string => {
    if (endValue.includes("K")) {
      if (value >= 1000) {
        return Math.floor(value / 1000) + "K";
      }
      return value.toString();
    }
    // ✅ FIXED: Handle percentage formatting
    if (hasPercent) {
      return value.toString(); // Keep decimal for percentages
    }

    return value.toString();
  };

  // ✅ FIXED: Removed the condition that was preventing animation
  const displayValue =
    formatCount(count) + (hasPlus ? "+" : "") + (hasPercent ? "%" : "");

  return (
    <span ref={elementRef} className="inline-block">
      {displayValue}
    </span>
  );
};
