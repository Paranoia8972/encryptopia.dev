import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const page = url.pathname;
  const country = request.headers.get("x-vercel-ip-country") || "unknown";

  await fetch(`${url.origin}/api/analytics?type=incrementView`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ page, country }),
  });

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
