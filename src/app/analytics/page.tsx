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
    <div className="flex min-h-screen w-full items-center justify-center py-12">
      <div className="relative mx-auto w-full max-w-6xl text-white">
        <AnalyticsDashboard
          avgVisitorsPerDay={avgVisitorsPerDay}
          amtVisitorsToday={amtVisitorsToday}
          timeseriesPageviews={pageviews}
          topCountries={topCountries}
        />
      </div>
      {/* <div className="flex space-x-4">
          <Card className="w-1/2">
            <CardHeader>
              <CardDescription>Avg. visitors/day</CardDescription>
              <CardTitle className="text-2xl">187</CardTitle>
            </CardHeader>
          </Card>
          <Card className="w-1/2">
            <CardHeader>
              <CardDescription>
                Visitors today <Badge percentage={100} />
              </CardDescription>
              <CardTitle className="text-2xl">1870</CardTitle>
            </CardHeader>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>This week's top visitors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <ReactCountryFlag className="text-2xl" svg countryCode="US" />
                <div>
                  <CardDescription>United States</CardDescription>
                  <CardTitle>1870</CardTitle>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ReactCountryFlag className="text-2xl" svg countryCode="IN" />
                <div>
                  <CardDescription>India</CardDescription>
                  <CardTitle>1870</CardTitle>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ReactCountryFlag className="text-2xl" svg countryCode="GB" />
                <div>
                  <CardDescription>United Kingdom</CardDescription>
                  <CardTitle>1870</CardTitle>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ReactCountryFlag className="text-2xl" svg countryCode="CA" />
                <div>
                  <CardDescription>Canada</CardDescription>
                  <CardTitle>1870</CardTitle>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ReactCountryFlag className="text-2xl" svg countryCode="DE" />
                <div>
                  <CardDescription>Germany</CardDescription>
                  <CardTitle>1870</CardTitle>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Daily Visitors</CardTitle>
          </CardHeader>
          <ChartContainer>
            <BarChart data={chartData}>
              <Bar dataKey="value" />
              <ChartTooltip content={<ChartTooltipContent />} />
            </BarChart>
          </ChartContainer>
        </Card> */}
    </div>
  );
};

export default Page;
