"use client";

import { analytics } from "@/lib/analytics";
import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";
import {} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

interface AnalyticsDashboardProps {
  avgVisitorsPerDay: string;
  amtVisitorsToday: number;
  timeseriesPageviews: Awaited<ReturnType<typeof analytics.retrieveDays>>;
  topCountries: [string, number][];
}

const Badge = ({ percentage }: { percentage: number }) => {
  const isPositive = percentage > 0;
  const isNeutral = percentage === 0;
  const isNegative = percentage < 0;

  if (isNaN(percentage)) return null;

  const positiveClassname = "bg-green-900/25 text-green-400 ring-green-400/25";
  const neutralClassname = "bg-zinc-900/25 text-zinc-400 ring-zinc-400/25";
  const negativeClassname = "bg-red-900/25 text-red-400 ring-red-400/25";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
        isPositive
          ? positiveClassname
          : isNeutral
            ? neutralClassname
            : negativeClassname
      }`}
    >
      {isPositive ? <ArrowUpRight className="h-3 w-3" /> : null}
      {isNeutral ? <ArrowRight className="h-3 w-3" /> : null}
      {isNegative ? <ArrowDownRight className="h-3 w-3" /> : null}
      {percentage.toFixed(0)}%
    </span>
  );
};

const chartConfig = {
  views: {
    label: "Views",
    color: "hsl(var(--chart-1))",
  },
};

const AnalyticsDashboard = ({
  avgVisitorsPerDay,
  amtVisitorsToday,
  timeseriesPageviews,
  topCountries,
}: AnalyticsDashboardProps) => {
  const countryChartData = topCountries.map(([countryCode, number]) => ({
    country: countryCode,
    views: number,
  }));

  return (
    <div className="flex w-[690px] flex-col gap-6">
      <div className="flex space-x-4">
        <Card className="w-1/2">
          <CardHeader>
            <CardDescription>Avg. visitors/day</CardDescription>
            <CardTitle className="text-2xl">
              {Math.round(Number(avgVisitorsPerDay))}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="w-1/2">
          <CardHeader>
            <CardDescription>
              Visitors today{" "}
              <Badge
                percentage={
                  (amtVisitorsToday / Number(avgVisitorsPerDay) - 1) * 100
                }
              />
            </CardDescription>
            <CardTitle className="text-2xl">{amtVisitorsToday}</CardTitle>
          </CardHeader>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Country Views</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={countryChartData}
              layout="vertical"
              margin={{
                right: 16,
              }}
            >
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="country"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <XAxis dataKey="views" type="number" />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Bar
                dataKey="views"
                layout="vertical"
                fill="var(--color-views)"
                radius={4}
              >
                <LabelList
                  dataKey="views"
                  position="right"
                  offset={8}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Page Views</CardTitle>
          <CardDescription>Views for the past 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={timeseriesPageviews.slice(-7)} // Ensure only the last 7 days are displayed
              margin={{
                top: 20,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date" // Assuming 'date' is the key for the date in your data
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) =>
                  new Date(value).toLocaleDateString("en-US", {
                    weekday: "short",
                  })
                }
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="views" fill="var(--chart-1)" radius={8}>
                {" "}
                // Assuming 'views' is the key for the views in your data
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
