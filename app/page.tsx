"use client";

import { useState } from "react";
import AnimatedBackground from "./components/AnimatedBackground";
import ImageGrid from "./components/ImageGrid";
import { ScrapedImage } from "@/lib/types";

// Fixed accent color
const ACCENT_COLOR = 'hsl(333, 100%, 65%)';
const ACCENT_COLOR_LIGHT = 'hsl(333, 100%, 78%)';

export default function Home() {
  const [url, setUrl] = useState("");
  const [warning, setWarning] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ScrapedImage[]>([]);
  const [error, setError] = useState("");

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

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!url || !isValidUrl(url)) return;

    setIsLoading(true);
    setError("");
    setImages([]);

    try {
      const res = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "An unexpected error occurred.");
      } else {
        setImages(data.images);
      }
    } catch {
      setError("Failed to connect to the server. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
              disabled={isLoading || !url || !!warning}
              className="w-full text-black px-8 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{ backgroundColor: ACCENT_COLOR }}
              onMouseEnter={(e) => !isLoading && (e.currentTarget.style.backgroundColor = ACCENT_COLOR_LIGHT)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = ACCENT_COLOR)}
            >
              {isLoading ? "Scraping..." : "Submit"}
            </button>
          </form>

          {error && (
            <div className="mt-8 px-4">
              <p className="text-red-400 bg-red-950 border border-red-800 rounded-lg px-4 py-3 text-sm">
                ❌ {error}
              </p>
            </div>
          )}

          <ImageGrid images={images} accentColor={ACCENT_COLOR} />
        </div>
      </div>
    </>
  );
}
