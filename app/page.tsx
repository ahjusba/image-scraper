"use client";

import { useState } from "react";
import AnimatedBackground from "./components/AnimatedBackground";

// Fixed accent color
const ACCENT_COLOR = 'hsl(333, 100%, 65%)';
const ACCENT_COLOR_LIGHT = 'hsl(333, 100%, 78%)';

export default function Home() {
  const [url, setUrl] = useState("");
  const [warning, setWarning] = useState("");

  const isValidUrl = (text: string): boolean => {
    try {
      new URL(text);
      return true;
    } catch {
      return false;
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      
      if (text && !isValidUrl(text)) {
        setWarning("Warning: The pasted text does not appear to be a valid URL");
      } else {
        setWarning("");
      }
    } catch (error) {
      console.error("Failed to read clipboard:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUrl(value);
    
    if (value && !isValidUrl(value)) {
      setWarning("Warning: The text does not appear to be a valid URL");
    } else {
      setWarning("");
    }
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Submission logic will be added later
    console.log("Submitted URL:", url);
  };

  return (
    <>
      <AnimatedBackground />
      <div className="min-h-screen p-4 sm:p-8">
        <div className="w-full max-w-2xl mx-auto mt-12 sm:mt-20">
          <h1 
            className="text-4xl sm:text-5xl font-bold mb-12 sm:mb-16 text-center px-4"
            style={{ color: ACCENT_COLOR }}
          >
            Image Scraper
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6 px-4">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <input
                type="text"
                value={url}
                onChange={handleInputChange}
                placeholder="Enter URL"
                className="w-full bg-zinc-900 text-white px-5 py-4 rounded-lg border-2 border-zinc-800 focus:outline-none transition-colors text-base"
                style={{ 
                  borderColor: '#27272a',
                }}
                onFocus={(e) => e.target.style.borderColor = ACCENT_COLOR}
                onBlur={(e) => e.target.style.borderColor = '#27272a'}
              />
              <button
                type="button"
                onClick={handlePaste}
                className="text-black px-8 py-4 rounded-lg font-bold transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
                style={{ 
                  backgroundColor: ACCENT_COLOR,
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = ACCENT_COLOR_LIGHT}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ACCENT_COLOR}
              >
                Paste
              </button>
            </div>
            
            {warning && (
              <p className="text-sm px-2" style={{ color: ACCENT_COLOR_LIGHT }}>
                ⚠️ {warning}
              </p>
            )}
            
            <button
              type="submit"
              className="w-full text-black px-8 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105 active:scale-95"
              style={{ 
                backgroundColor: ACCENT_COLOR,
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = ACCENT_COLOR_LIGHT}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ACCENT_COLOR}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
