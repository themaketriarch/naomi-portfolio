import { list } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const prefix = searchParams.get("prefix") ?? "";

  const { blobs } = await list({ prefix });
  return NextResponse.json(blobs.map((b) => b.pathname));
}
