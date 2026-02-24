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

export default function AnimatedBackground() {
  const [dots1, setDots1] = useState("");
  const [dots2, setDots2] = useState("");
  const [dots3, setDots3] = useState("");
  const [dots4, setDots4] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    //No cascading because empty dependency array, so this runs only once on mount, we turn of the eslint warning for that
    setDots1(generateDots(40));
    setDots2(generateDots(40));
    setDots3(generateDots(40));
    setDots4(generateDots(40));
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
      
      {isMounted && (
        <>
          <div
            style={{
              ...dotStyle,
              textShadow: dots1,
              animation: "44s -27s move infinite ease-in-out alternate",
            }}
          >
            .
          </div>
          
          <div
            style={{
              ...dotStyle,
              textShadow: dots2,
              animation: "43s -32s move infinite ease-in-out alternate",
            }}
          >
            .
          </div>
          
          <div
            style={{
              ...dotStyle,
              textShadow: dots3,
              animation: "42s -23s move infinite ease-in-out alternate",
            }}
          >
            .
          </div>
          
          <div
            style={{
              ...dotStyle,
              textShadow: dots4,
              animation: "41s -19s move infinite ease-in-out alternate",
            }}
          >
            .
          </div>
        </>
      )}
    </>
  );
}
