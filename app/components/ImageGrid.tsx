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
            <div className="w-full aspect-square overflow-hidden">
              <img
                src={img.url}
                alt={img.filename}
                className="w-full h-full object-cover"
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
