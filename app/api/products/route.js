import { db } from "@/lib/db";

export async function GET() {
  const [rows] = await db.query("SELECT * FROM produkty");
  return Response.json(rows);
}


// Fetch users from the API; build an absolute URL using env/localhost so Node's fetch accepts it
export async function getProducts() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/products`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}