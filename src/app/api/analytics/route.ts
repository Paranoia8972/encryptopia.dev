import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis/cloudflare";

const redis = new Redis({
  url: process.env.REDIS_URL!,
  token: process.env.REDIS_TOKEN!,
});

export const runtime = "edge";

export async function GET() {
  const totalViews = await redis.get("total_views");
  const countryViews = await redis.hgetall("country_views");
  const now = Date.now();
  const weekAgo = now - 7 * 24 * 60 * 60 * 1000;
  const monthAgo = now - 30 * 24 * 60 * 60 * 1000;

  const weeklyViews = await redis.zcount("views_timeseries", weekAgo, now);
  const monthlyViews = await redis.zcount("views_timeseries", monthAgo, now);

  const pageViews = await redis.zrevrangebyscore(
    "views_timeseries",
    "+inf",
    "-inf",
    {
      withscores: true,
      limit: { offset: 0, count: 10 },
    },
  );

  const formattedPageViews = pageViews.reduce(
    (acc: Record<string, number>, [key, score]) => {
      const [page] = (key as string).split(":");
      acc[page] = (acc[page] || 0) + 1;
      return acc;
    },
    {},
  );

  return NextResponse.json({
    totalViews,
    countryViews,
    weeklyViews,
    monthlyViews,
    pageViews: formattedPageViews,
  });
}
