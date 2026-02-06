/* eslint-disable no-undef */
import { db } from "@/lib/db";

export async function POST(request) {
  try {
    const getUser = await request.json();

    if (!getUser?.userId) {
      return Response.json({ error: "Missing userId" }, { status: 400 });
    }

    const [rows] = await db.query(
      `
            SELECT klienci.id AS customerID, klienci.imie AS name, klienci.nazwisko AS surname, klienci.telefon AS phoneNumber, adresy.ulica_i_numer_domu_lub_mieszkania AS street, adresy.miejscowosc AS town, adresy.kod_pocztowy AS postalCode
            FROM klienci
            INNER JOIN uzytkownicy ON uzytkownicy.id = klienci.id_uzytkownik
            INNER JOIN adresy ON adresy.id_klient = klienci.id
            WHERE uzytkownicy.id = ?;
            `,
      [getUser.userId],
    );
    return Response.json(rows);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function getUser(userId) {
  //  await new Promise (resolve => setTimeout(resolve, 5000));
  // throw new Error();
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/getUser`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch user ID");
  return res.json();
}
