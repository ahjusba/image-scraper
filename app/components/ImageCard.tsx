import Image from "next/image";
import { ScrapedImage } from "@/lib/scraper";

interface ImageCardProps {
  image: ScrapedImage;
  accentColor: string;
}

export default function ImageCard({ image, accentColor }: ImageCardProps) {
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
          onClick={() => console.log("download")}
          className="flex-1 text-xs font-semibold py-1.5 rounded-md border transition-colors hover:bg-zinc-800"
          style={{ borderColor: accentColor, color: accentColor }}
        >
          Download
        </button>
      </div>
    </div>
  );
}
