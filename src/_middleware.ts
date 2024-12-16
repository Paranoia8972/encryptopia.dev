import { NextRequest, NextResponse } from "next/server";
import { analytics } from "@/lib/analytics";

export default async function middleware(req: NextRequest) {
  try {
    await analytics.track("pageview", {
      page: req.url,
      country: req.headers.get("x-vercel-ip-country"),
    });
  } catch (err) {
    console.error(err);
  }

  return NextResponse.next();
}

export const matcher = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|analytics).*)",
  ],
};
