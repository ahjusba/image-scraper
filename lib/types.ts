export interface ScrapedImage {
  url: string;
  filename: string;
}

export interface S3UploadResult {
  bucket: string;
  key: string;
  url: string;
  originalUrl: string;
  size: number;
  uploadedAt: string;
}

export interface BucketEntry {
  data: Buffer;
  filename: string;
  originalUrl: string;
  contentType: string;
  uploadedAt: string;
}