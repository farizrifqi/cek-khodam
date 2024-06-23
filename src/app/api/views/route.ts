import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();
export const runtime = "edge";

export async function POST(req: NextRequest): Promise<NextResponse> {
  let ip =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    req.ip;

  if (ip) {
    const buf = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(ip)
    );
    const hash = Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    const key = `deduplicate:${hash}`;

    const isNew = await redis.set(key, true, {
      nx: true,
      ex: 24 * 60 * 60,
    });

    if (!isNew) {
      return new NextResponse(null, { status: 202 });
    }
  }

  await redis.incr("pageviews-khodam");
  return new NextResponse(null, { status: 202 });
}
