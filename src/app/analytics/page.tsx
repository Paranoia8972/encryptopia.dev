import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import { getDate } from "@/lib/utils";
import { analytics } from "@/lib/analytics";

const Page = async () => {
  const TRACKING_DAYS = 7;

  const pageviews = await analytics.retrieveDays("pageview", TRACKING_DAYS);

  const totalPageviews = pageviews.reduce((acc, curr) => {
    return (
      acc +
      curr.events.reduce((acc, curr) => {
        return acc + Object.values(curr)[0]!;
      }, 0)
    );
  }, 0);

  const avgVisitorsPerDay = (totalPageviews / TRACKING_DAYS).toFixed(1);

  const amtVisitorsToday = pageviews
    .filter((ev) => ev.date === getDate())
    .reduce((acc, curr) => {
      return (
        acc +
        curr.events.reduce((acc, curr) => acc + Object.values(curr)[0]!, 0)
      );
    }, 0);

  const topCountriesMap = new Map<string, number>();

  for (let i = 0; i < pageviews.length; i++) {
    const day = pageviews[i];
    if (!day) continue;

    for (let j = 0; j < day.events.length; j++) {
      const event = day.events[j];
      if (!event) continue;

      const key = Object.keys(event)[0]!;
      const value = Object.values(event)[0]!;

      const parsedKey = JSON.parse(key);
      const country = parsedKey?.country;

      if (country) {
        if (topCountriesMap.has(country)) {
          const prevValue = topCountriesMap.get(country)!;
          topCountriesMap.set(country, prevValue + value);
        } else {
          topCountriesMap.set(country, value);
        }
      }
    }
  }

  const topCountries = Array.from(topCountriesMap.entries())
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <main className="prose prose-invert max-w-none flex-grow">
      <h2 className="text-lg font-medium text-gray-100">Analytics</h2>

      <AnalyticsDashboard
        avgVisitorsPerDay={avgVisitorsPerDay}
        amtVisitorsToday={amtVisitorsToday}
        timeseriesPageviews={pageviews}
        topCountries={topCountries}
      />
    </main>
  );
};

export default Page;
