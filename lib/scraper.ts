import * as cheerio from "cheerio";
import { ScrapedImage } from "@/lib/types";

export class ScraperError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message);
    this.name = "ScraperError";
  }
}

const fetchHtml = async (url: string): Promise<string> => {
  let response: Response;
  try {
    response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; ImageScraper/1.0)",
        "Accept": "text/html,application/xhtml+xml",
      },
      signal: AbortSignal.timeout(15_000),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown network error";
    throw new ScraperError(`Could not reach the provided URL: ${message}`, 502);
  }

  if (response.status === 404) {
    throw new ScraperError(
      "The provided URL returned 404 Not Found. Please check the URL and try again.",
      404
    );
  }

  if (!response.ok) {
    throw new ScraperError(
      `The provided URL returned an error: ${response.status} ${response.statusText}.`,
      502
    );
  }

  try {
    return await response.text();
  } catch {
    throw new ScraperError("Failed to read the page content.", 502);
  }
}

const scrapeImages = (html: string, baseUrl: string): ScrapedImage[] => {
  const $ = cheerio.load(html);
  const seen = new Set<string>();
  const images: ScrapedImage[] = [];

  $("img").each((_, el) => {
    const rawSrc = $(el).attr("src");
    if (!rawSrc || rawSrc.startsWith("data:")) return;

    let resolvedUrl: string;
    try {
      resolvedUrl = new URL(rawSrc, baseUrl).toString();
    } catch {
      return;
    }

    if (seen.has(resolvedUrl)) return;
    seen.add(resolvedUrl);

    const pathname = new URL(resolvedUrl).pathname;
    const filename = pathname.split("/").filter(Boolean).pop() ?? "image";

    images.push({ url: resolvedUrl, filename });
  });

  return images;
};

export const scrapeUrl = async ( url: string): Promise<ScrapedImage[]> => {
  const html = await fetchHtml(url);
  return scrapeImages(html, url);
}
