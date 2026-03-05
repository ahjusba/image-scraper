"use client";

import { useState } from "react";
import Image from "next/image";
import { ScrapedImage } from "@/lib/types";

type UploadState = "idle" | "loading" | "success" | "error";

interface ImageCardProps {
  image: ScrapedImage;
  accentColor: string;
  showButtons?: boolean;
}

export default function ImageCard({ image, accentColor, showButtons = true }: ImageCardProps) {
  const [uploadState, setUploadState] = useState<UploadState>("idle");

  const handleDownload = async () => {
    if (uploadState === "loading" || uploadState === "success") return;

    setUploadState("loading");

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: image.url, filename: image.filename }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("[Upload] Failed:", data.error);
        setUploadState("error");
        return;
      }

      console.log("[Upload] Success:", data.result);
      setUploadState("success");
    } catch (err) {
      console.error("[Upload] Unexpected error:", err);
      setUploadState("error");
    }
  };

  const downloadLabel =
    uploadState === "loading"
      ? "Uploading…"
      : uploadState === "success"
        ? "Saved ✓"
        : uploadState === "error"
          ? "Retry"
          : "Download";

  const statusColor = uploadState === "error" ? "#f87171" : accentColor;

  return (
    <div className="bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 flex flex-col">
      <p className="text-zinc-200 text-xs font-medium px-3 py-2 truncate border-b border-zinc-800">
        {image.filename}
      </p>
      <div className="relative w-full aspect-square overflow-hidden">
        <Image
          src={image.url}
          alt={image.filename}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, 33vw"
          unoptimized
        />
      </div>
      {showButtons && (
      <div className="flex gap-2 px-3 py-3">
        <a
          href={image.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center text-xs font-semibold py-1.5 rounded-md transition-opacity hover:opacity-80"
          style={{ backgroundColor: accentColor, color: "#000" }}
        >
          Visit
        </a>
        <button
          onClick={handleDownload}
          disabled={uploadState === "loading" || uploadState === "success"}
          className="flex-1 text-xs font-semibold py-1.5 rounded-md border transition-colors hover:bg-zinc-800 disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ borderColor: statusColor, color: statusColor }}
        >
          {downloadLabel}
        </button>
      </div>
      )}
    </div>
  );
}
