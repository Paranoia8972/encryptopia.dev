import Link from "next/link";
import { Mail, Github, Twitter, Linkedin } from "lucide-react";
import { getPageViews, getTopPages, getGeoData } from "@/lib/analytics";

export const runtime = "edge";

async function getData() {
  const topPages = await getTopPages();
  const overallViews = await getPageViews("/");
  const geoData = await getGeoData("/");

  return { topPages, overallViews, geoData };
}

export default async function Component() {
  const { topPages, overallViews, geoData } = await getData();

  return (
    <main className="flex-grow">
      <h1 className="mb-8 text-3xl font-bold text-gray-100">Analytics</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-lg bg-gray-800 p-6">
          <h2 className="mb-4 text-xl font-semibold text-gray-100">
            Overall Views
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-400">Total</p>
              <p className="text-2xl font-bold text-emerald-500">
                {overallViews.total}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">This Week</p>
              <p className="text-2xl font-bold text-emerald-500">
                {overallViews.week}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">This Month</p>
              <p className="text-2xl font-bold text-emerald-500">
                {overallViews.month}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-gray-800 p-6">
          <h2 className="mb-4 text-xl font-semibold text-gray-100">
            Top Pages
          </h2>
          <ul className="space-y-2">
            {topPages.map((page, index) => (
              <li key={index} className="flex justify-between">
                <span className="text-gray-400">{page.page}</span>
                <span className="font-semibold text-emerald-500">
                  {page.views}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg bg-gray-800 p-6 md:col-span-2">
          <h2 className="mb-4 text-xl font-semibold text-gray-100">
            Geolocation Data
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Object.entries(geoData).map(([country, views]) => (
              <div key={country} className="flex justify-between">
                <span className="text-gray-400">{country}</span>
                <span className="font-semibold text-emerald-500">{views}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
