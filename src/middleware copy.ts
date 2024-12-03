import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const page = url.pathname;
  const country = request.headers.get("x-vercel-ip-country") || "Unknown";

  const weekKey = `views:week:${page}`;
  const monthKey = `views:month:${page}`;
  const geoKey = `geo:${page}`;

  await Promise.all([
    redis.incr(`total:${page}`),
    redis.incr(weekKey),
    redis.expire(weekKey, 60 * 60 * 24 * 7),
    redis.incr(monthKey),
    redis.expire(monthKey, 60 * 60 * 24 * 30),
    redis.zincrby(geoKey, 1, country),
  ]);

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
