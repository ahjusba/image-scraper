import { NextResponse } from "next/server";
import { downloadFromS3 } from "@/lib/aws";

export const GET = async () => {
  const images = downloadFromS3();
  console.log("[API] Retrieved images from mock S3:", images);
  return NextResponse.json({ images });
};
