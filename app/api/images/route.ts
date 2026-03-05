import { NextResponse } from "next/server";
import { downloadFromS3 } from "@/lib/aws";

export const GET = async () => {
  const images = downloadFromS3();
  return NextResponse.json({ images });
};
