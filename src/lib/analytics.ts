const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function getPageViews(page: string) {
  const res = await fetch(
    `/api/analytics?type=pageViews&page=${encodeURIComponent(page)}`,
  );
  return res.json();
}

export async function getTopPages() {
  const res = await fetch(`${API_BASE_URL}/api/analytics?type=topPages`);
  return res.json();
}

export async function getGeoData(page: string) {
  const res = await fetch(
    `/api/analytics?type=geoData&page=${encodeURIComponent(page)}`,
  );
  return res.json();
}
