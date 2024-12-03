import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function getPageViews(page: string) {
  const [total, week, month] = await Promise.all([
    redis.get(`total:${page}`),
    redis.get(`views:week:${page}`),
    redis.get(`views:month:${page}`),
  ]);

  return {
    total: Number(total) || 0,
    week: Number(week) || 0,
    month: Number(month) || 0,
  };
}

export async function getTopPages() {
  const keys = await redis.keys("total:*");
  const pages = await Promise.all(
    keys.map(async (key) => {
      const page = key.replace("total:", "");
      const views = await redis.get(key);
      return { page, views: Number(views) };
    }),
  );

  return pages.sort((a, b) => b.views - a.views).slice(0, 5);
}

export async function getGeoData(page: string) {
  const geoData = await redis.zrange(`geo:${page}`, 0, -1, {
    withScores: true,
  });

  const pairs: [string, number][] = [];
  for (let i = 0; i < geoData.length; i += 2) {
    pairs.push([geoData[i] as string, Number(geoData[i + 1])]);
  }

  return Object.fromEntries(pairs);
}
