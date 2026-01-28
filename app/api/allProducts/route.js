/* eslint-disable no-undef */
import { db } from "@/lib/db";

export async function GET() {
  const [rows] =
    await db.query(`SELECT id, nazwa as prodTitle, cena_brutto as price, opis as description, obrazek as image, opis_obrazka as imageDescription, czas_oczekiwania_na_wykonanie as waitingTime, opakowanie_sup as packaging, ilosc_w_opakowaniu as quantityPerPackage, waga as weight, sklad as ingredients, alergeny as allergens, dodatkowe_info as additionalInfo
                                 FROM produkty`);
  return Response.json(rows);
}

// Fetch users from the API; build an absolute URL using env/localhost so Node's fetch accepts it
export async function getAllProducts() {
  //  await new Promise (resolve => setTimeout(resolve, 5000));
  // throw new Error();
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/allProducts`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}
