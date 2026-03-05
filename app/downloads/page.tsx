"use client";

import { useEffect, useState } from "react";
import ImageGrid from "@/app/components/ImageGrid";
import { ScrapedImage } from "@/lib/types";

const ACCENT_COLOR = "hsl(333, 100%, 65%)";

export default function DownloadsPage() {
  const [images, setImages] = useState<ScrapedImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("/api/images");
        const data = await res.json();
        if (!res.ok) {
          setError(data.error ?? "Failed to load images.");
        } else {
          setImages(data.images);
        }
      } catch {
        setError("Failed to connect to the server.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <>
      <div className="min-h-screen p-4 sm:p-8">
        <div className="w-full max-w-2xl mx-auto mt-12 sm:mt-20">
          <h1
            className="text-4xl sm:text-5xl font-bold mb-4 text-center px-4"
            style={{ color: ACCENT_COLOR }}
          >
            Downloads
          </h1>
          <p className="text-center text-zinc-400 text-sm mb-12">
            Images saved to the mock S3 bucket
          </p>

          {isLoading && (
            <p className="text-center text-zinc-400">Loading…</p>
          )}

          {error && (
            <div className="px-4">
              <p className="text-red-400 bg-red-950 border border-red-800 rounded-lg px-4 py-3 text-sm">
                ❌ {error}
              </p>
            </div>
          )}

          {!isLoading && !error && images.length === 0 && (
            <p className="text-center text-zinc-500 text-sm">
              No images saved yet. Go scrape some!
            </p>
          )}

          <ImageGrid images={images} accentColor={ACCENT_COLOR} showButtons={false} />
        </div>
      </div>
    </>
  );
}
