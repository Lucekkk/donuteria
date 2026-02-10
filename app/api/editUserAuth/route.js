/* eslint-disable no-undef */
import { db } from "@/lib/db";

export async function POST(request) {
  try {
    const payload = await request.json();
    const userData = payload?.userData ?? payload;

    const [rows] = await db.query(
      `
        UPDATE uzytkownicy
        SET login = ?, password_hash = ?
        WHERE id = ?
      `,
      [userData.login, userData.password_hash, userData.userID],
    );

    return Response.json(rows);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function editUserAuth(userData) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/editUserAuth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to update user auth data");
  return res.json();
}
