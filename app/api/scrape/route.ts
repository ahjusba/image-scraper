import { NextRequest, NextResponse } from "next/server";
import { scrapeImages } from "@/lib/scraper";

export async function POST(request: NextRequest) {
  // Parse request body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { url } = body as { url?: unknown };

  if (!url || typeof url !== "string") {
    return NextResponse.json({ error: "A valid URL is required." }, { status: 400 });
  }

  // Validate URL format
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
  } catch {
    return NextResponse.json({ error: "Invalid URL format." }, { status: 400 });
  }

  // Fetch the target page
  let response: Response;
  try {
    response = await fetch(parsedUrl.toString(), {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; ImageScraper/1.0)",
        "Accept": "text/html,application/xhtml+xml",
      },
      signal: AbortSignal.timeout(15_000),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown network error";
    return NextResponse.json(
      { error: `Could not reach the provided URL: ${message}` },
      { status: 502 }
    );
  }

  // Handle HTTP error responses
  if (response.status === 404) {
    return NextResponse.json(
      { error: "The provided URL returned 404 Not Found. Please check the URL and try again." },
      { status: 404 }
    );
  }

  if (!response.ok) {
    return NextResponse.json(
      { error: `The provided URL returned an error: ${response.status} ${response.statusText}.` },
      { status: 502 }
    );
  }

  // Read page HTML
  let html: string;
  try {
    html = await response.text();
  } catch {
    return NextResponse.json(
      { error: "Failed to read the page content." },
      { status: 502 }
    );
  }

  // Scrape images (placeholder — real implementation in lib/scraper.ts)
  const images = scrapeImages(html, parsedUrl.toString());

  return NextResponse.json({ images });
}
