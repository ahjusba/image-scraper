import Image from "next/image";
import { ScrapedImage } from "@/lib/scraper";

interface ImageGridProps {
  images: ScrapedImage[];
  accentColor: string;
}

export default function ImageGrid({ images, accentColor }: ImageGridProps) {
  if (images.length === 0) return null;

  return (
    <div className="mt-12 px-4">
      <h2 className="text-xl font-semibold mb-6" style={{ color: accentColor }}>
        Found {images.length} image{images.length !== 1 ? "s" : ""}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {images.map((img, i) => (
          <div
            key={i}
            className="bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 flex flex-col"
          >
            <div className="relative w-full aspect-square overflow-hidden">
              <Image
                src={img.url}
                alt={img.filename}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 33vw"
                unoptimized
              />
            </div>
            <p className="text-zinc-400 text-xs px-2 py-2 truncate shrink-0">
              {img.filename}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
