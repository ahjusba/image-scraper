// Mock AWS S3 service
// Replace the internals of `uploadToS3` with real AWS SDK calls when ready.

export interface S3UploadResult {
  bucket: string;
  key: string;
  url: string;
  size: number;
  uploadedAt: string;
}

// In-memory store simulating an S3 bucket
const mockBucket = new Map<string, { data: Buffer; contentType: string; uploadedAt: string }>();

const MOCK_BUCKET_NAME = "mock-image-scraper-bucket";
const MOCK_REGION = "eu-north-1";

const buildMockUrl = (key: string): string =>
  `https://${MOCK_BUCKET_NAME}.s3.${MOCK_REGION}.amazonaws.com/${key}`;

const simulateNetworkDelay = (): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, 600));

export const uploadToS3 = async ( filename: string, data: Buffer, contentType: string ): 
Promise<S3UploadResult> => {
  await simulateNetworkDelay();

  const key = `images/${Date.now()}-${filename}`;
  const uploadedAt = new Date().toISOString();

  mockBucket.set(key, { data, contentType, uploadedAt });

  const result: S3UploadResult = {
    bucket: MOCK_BUCKET_NAME,
    key,
    url: buildMockUrl(key),
    size: data.byteLength,
    uploadedAt,
  };

  console.log("[Mock AWS S3] Upload successful:", result);

  return result;
};

export const listMockBucket = (): string[] => Array.from(mockBucket.keys());
