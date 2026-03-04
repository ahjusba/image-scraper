import { NextRequest, NextResponse } from "next/server";
import { scrapeUrl, ScraperError } from "@/lib/scraper";

export const POST = async (request: NextRequest) => {
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

  // Scrape images
  try {
    const images = await scrapeUrl(parsedUrl.toString());
    return NextResponse.json({ images });
  } catch (err) {
    if (err instanceof ScraperError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}
