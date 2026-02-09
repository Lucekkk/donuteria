/* eslint-disable no-undef */
import { db } from "@/lib/db";

export async function GET() {
  const [rows] =
    await db.query(`SELECT id, login, email, password_hash, rola, punkty
                                 FROM uzytkownicy`);
  return Response.json(rows);
}

export async function getUsers() {
  //  await new Promise (resolve => setTimeout(resolve, 5000));
  // throw new Error();
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/getUsers`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}
