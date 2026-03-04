import { NextRequest, NextResponse } from "next/server";
import { uploadToS3 } from "@/lib/aws";

export const POST = async (request: NextRequest) => {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { url, filename } = body as { url?: unknown; filename?: unknown };

  if (!url || typeof url !== "string") {
    return NextResponse.json({ error: "A valid image URL is required." }, { status: 400 });
  }

  if (!filename || typeof filename !== "string") {
    return NextResponse.json({ error: "A filename is required." }, { status: 400 });
  }

  // Fetch the image
  let imageResponse: Response;
  try {
    imageResponse = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; ImageScraper/1.0)" },
      signal: AbortSignal.timeout(15_000),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: `Failed to fetch image: ${message}` }, { status: 502 });
  }

  if (!imageResponse.ok) {
    return NextResponse.json(
      { error: `Image fetch returned status ${imageResponse.status}.` },
      { status: 502 }
    );
  }

  const contentType = imageResponse.headers.get("content-type") ?? "application/octet-stream";
  const arrayBuffer = await imageResponse.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Upload to mock S3
  try {
    const result = await uploadToS3(filename, buffer, contentType);
    return NextResponse.json({ success: true, result });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: `Upload failed: ${message}` }, { status: 500 });
  }
};
