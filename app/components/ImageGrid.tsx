import { ScrapedImage } from "@/lib/types";
import ImageCard from "./ImageCard";

interface ImageGridProps {
  images: ScrapedImage[];
  accentColor: string;
  showButtons?: boolean;
}

export default function ImageGrid({ images, accentColor, showButtons = true }: ImageGridProps) {
  if (images.length === 0) return null;

  return (
    <div className="mt-12 px-4">
      <h2 className="text-xl font-semibold mb-6" style={{ color: accentColor }}>
        Found {images.length} image{images.length !== 1 ? "s" : ""}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {images.map((img) => (
          <ImageCard key={img.url} image={img} accentColor={accentColor} showButtons={showButtons} />
        ))}
      </div>
    </div>
  );
}
