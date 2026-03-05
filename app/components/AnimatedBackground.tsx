"use client";

import { useState, useEffect } from "react";

// Generate random dots with text-shadow
const generateDots = (count: number) => {
  const shadows = [];
  for (let i = 0; i < count; i++) {
    const x = (Math.random() - 0.5) * 3;
    const y = (Math.random() - 0.5) * 3;
    const hue = Math.random() * 360;
    shadows.push(`${x}em ${y}em 7px hsla(${hue}, 100%, 50%, 0.9)`);
  }
  return shadows.join(", ");
};

const ANIMATION_DURATIONS = [
  "44s -27s move infinite ease-in-out alternate",
  "43s -32s move infinite ease-in-out alternate",
  "42s -23s move infinite ease-in-out alternate",
  "41s -19s move infinite ease-in-out alternate",
];

export default function AnimatedBackground() {
  const [dots, setDots] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setDots(ANIMATION_DURATIONS.map(() => generateDots(40)));
    setIsMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dotStyle = {
    position: "fixed" as const,
    top: "50%",
    left: "50%",
    width: "3em",
    height: "3em",
    fontSize: "52px",
    color: "transparent",
    mixBlendMode: "screen" as const,
    pointerEvents: "none" as const,
  };

  return (
    <>
      <style jsx global>{`
        @keyframes move {
          from {
            transform: rotate(0deg) scale(12) translateX(-20px);
          }
          to {
            transform: rotate(360deg) scale(18) translateX(20px);
          }
        }
      `}</style>
      
      <div className="fixed inset-0 -z-10" style={{ background: "#123" }} />
      
      {isMounted && dots.map((shadow, i) => (
        <div
          key={i}
          style={{
            ...dotStyle,
            textShadow: shadow,
            animation: ANIMATION_DURATIONS[i],
          }}
        >
          .
        </div>
      ))}
    </>
  );
}