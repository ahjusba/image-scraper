// Mock AWS S3 service
import { ScrapedImage, S3UploadResult, BucketEntry } from "@/lib/types";

// In-memory store simulating an S3 bucket
// Stored on globalThis so the same Map instance is shared across all
// Next.js route handlers (each route gets its own module evaluation context).
// this is used to persist uploaded images across requests for testing purposes.
declare global {
  var mockS3Bucket: Map<string, BucketEntry> | undefined;
}

const mockBucket: Map<string, BucketEntry> =
  globalThis.mockS3Bucket ?? (globalThis.mockS3Bucket = new Map());

const MOCK_BUCKET_NAME = "mock-image-scraper-bucket";
const MOCK_REGION = "eu-north-1";

const buildMockUrl = (key: string): string =>
  `https://${MOCK_BUCKET_NAME}.s3.${MOCK_REGION}.amazonaws.com/${key}`;

const simulateNetworkDelay = (): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, 600));

export const uploadToS3 = async (
  filename: string,
  data: Buffer,
  contentType: string,
  originalUrl: string
): Promise<S3UploadResult> => {
  await simulateNetworkDelay();

  const key = `images/${Date.now()}-${filename}`;
  const uploadedAt = new Date().toISOString();

  mockBucket.set(key, { data, filename, originalUrl, contentType, uploadedAt });

  const result: S3UploadResult = {
    bucket: MOCK_BUCKET_NAME,
    key,
    url: buildMockUrl(key),
    originalUrl,
    size: data.byteLength,
    uploadedAt,
  };

  return result;
};

export const downloadFromS3 = (): ScrapedImage[] =>
  Array.from(mockBucket.values()).map((entry) => ({
    url: entry.originalUrl,
    filename: entry.filename,
  }));