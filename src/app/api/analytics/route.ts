import { NextApiRequest, NextApiResponse } from "next";
import Redis from "ioredis";

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT || "6379"),
  password: process.env.REDIS_PASSWORD,
  tls: process.env.REDIS_TLS === "true" ? {} : undefined,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, query } = req;

  switch (method) {
    case "GET":
      if (query.type === "pageViews") {
        const { page } = query;
        const [total, week, month] = await Promise.all([
          redis.get(`total:${page}`),
          redis.get(`views:week:${page}`),
          redis.get(`views:month:${page}`),
        ]);
        res.status(200).json({
          total: Number(total) || 0,
          week: Number(week) || 0,
          month: Number(month) || 0,
        });
      } else if (query.type === "topPages") {
        const keys = await redis.keys("total:*");
        const pages = await Promise.all(
          keys.map(async (key) => {
            const page = key.replace("total:", "");
            const views = await redis.get(key);
            return { page, views: Number(views) };
          }),
        );
        res
          .status(200)
          .json(pages.sort((a, b) => b.views - a.views).slice(0, 5));
      } else if (query.type === "geoData") {
        const { page } = query;
        const geoData = await redis.zrangebyscore(`geo:${page}`, 0, -1);
        const geoScores = await Promise.all(
          geoData.map(async (country) => {
            const views = await redis.zscore(`geo:${page}`, country);
            return [country, Number(views)];
          }),
        );
        res.status(200).json(Object.fromEntries(geoScores));
      } else {
        res.status(400).json({ error: "Invalid query type" });
      }
      break;
    case "POST":
      if (query.type === "incrementView") {
        const { page, country } = req.body;
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
        res.status(200).json({ success: true });
      } else {
        res.status(400).json({ error: "Invalid query type" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
