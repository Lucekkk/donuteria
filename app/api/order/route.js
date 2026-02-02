/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { db } from "@/lib/db";

export async function POST(request) {
  try {
    const clientOrder = await request.json();

    console.log(clientOrder)

    // const [rows] = await db.query(
    //   `INSERT INTO uzytkownicy(login, email, password_hash, data_utworzenia, rola)
    //    VALUES(?, ?, ?, CURRENT_DATE(), 'user')`,
    //   [newUser.login, newUser.email, newUser.password_hash],
    // );

    return Response.json({
      success: true,
      message: "Dokonano zakupu!",
    });
  } catch (error) {
    console.error("Błąd przy zakupie", error);
    return Response.json(
      { success: false, message: "Błąd przy zakupie" },
      { status: 500 },
    );
  }
}

export async function sendNewOrder(order) {
  // await new Promise (resolve => setTimeout(resolve, 5000));
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Nie udało się dokonać zakupu");
  return res.json();
}
