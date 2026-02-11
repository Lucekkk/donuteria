/* eslint-disable no-undef */
import { db } from "@/lib/db";

const PRODUCT_SELECT = `SELECT id, nazwa as prodTitle, cena_brutto as price, opis as description, obrazek as image, opis_obrazka as imageDescription, czas_oczekiwania_na_wykonanie as waitingTime, opakowanie_sup as packaging, ilosc_w_opakowaniu as quantityPerPackage, waga as weight, sklad as ingredients, alergeny as allergens, dodatkowe_info as additionalInfo
                                 FROM produkty`;

const toNumberOrNull = (value) => {
  if (value === null || value === undefined || value === "") return null;
  const numeric = Number(value);
  return Number.isNaN(numeric) ? null : numeric;
};

const normalizeProductPayload = (payload = {}) => ({
  prodTitle: payload.prodTitle?.trim() || "",
  price: toNumberOrNull(payload.price),
  description: payload.description?.trim() || null,
  image: payload.image?.trim() || null,
  imageDescription: payload.imageDescription?.trim() || null,
  waitingTime: payload.waitingTime?.trim() || null,
  packaging: payload.packaging?.trim() || null,
  quantityPerPackage: toNumberOrNull(payload.quantityPerPackage),
  weight: payload.weight?.trim() || null,
  ingredients: payload.ingredients?.trim() || null,
  allergens: payload.allergens?.trim() || null,
  additionalInfo: payload.additionalInfo?.trim() || null,
});

export async function GET() {
  const [rows] = await db.query(PRODUCT_SELECT);
  return Response.json(rows);
}

export async function POST(request) {
  try {
    const payload = normalizeProductPayload(await request.json());

    if (!payload.prodTitle || payload.price === null) {
      return Response.json(
        { error: "Nazwa produktu i cena są wymagane" },
        { status: 400 },
      );
    }

    const [result] = await db.query(
      `INSERT INTO produkty
        (nazwa, cena_brutto, opis, obrazek, opis_obrazka, czas_oczekiwania_na_wykonanie, opakowanie_sup, ilosc_w_opakowaniu, waga, sklad, alergeny, dodatkowe_info)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        payload.prodTitle,
        payload.price,
        payload.description,
        payload.image,
        payload.imageDescription,
        payload.waitingTime,
        payload.packaging,
        payload.quantityPerPackage,
        payload.weight,
        payload.ingredients,
        payload.allergens,
        payload.additionalInfo,
      ],
    );

    const [rows] = await db.query(`${PRODUCT_SELECT} WHERE id = ?`, [
      result.insertId,
    ]);

    return Response.json({ product: rows[0] });
  } catch (error) {
    return Response.json(
      { error: error?.message || "Nie udało się dodać produktu" },
      { status: 500 },
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const productId = Number(body?.id);
    const payload = normalizeProductPayload(body);

    if (!productId) {
      return Response.json({ error: "Brak ID produktu" }, { status: 400 });
    }

    if (!payload.prodTitle || payload.price === null) {
      return Response.json(
        { error: "Nazwa produktu i cena są wymagane" },
        { status: 400 },
      );
    }

    await db.query(
      `UPDATE produkty
        SET nazwa = ?, cena_brutto = ?, opis = ?, obrazek = ?, opis_obrazka = ?, czas_oczekiwania_na_wykonanie = ?, opakowanie_sup = ?, ilosc_w_opakowaniu = ?, waga = ?, sklad = ?, alergeny = ?, dodatkowe_info = ?
        WHERE id = ?`,
      [
        payload.prodTitle,
        payload.price,
        payload.description,
        payload.image,
        payload.imageDescription,
        payload.waitingTime,
        payload.packaging,
        payload.quantityPerPackage,
        payload.weight,
        payload.ingredients,
        payload.allergens,
        payload.additionalInfo,
        productId,
      ],
    );

    const [rows] = await db.query(`${PRODUCT_SELECT} WHERE id = ?`, [
      productId,
    ]);

    return Response.json({ product: rows[0] });
  } catch (error) {
    return Response.json(
      { error: error?.message || "Nie udało się zaktualizować produktu" },
      { status: 500 },
    );
  }
}

export async function DELETE(request) {
  try {
    const body = await request.json();
    const productId = Number(body?.id);

    if (!productId) {
      return Response.json({ error: "Brak ID produktu" }, { status: 400 });
    }

    await db.query(`DELETE FROM produkty WHERE id = ?`, [productId]);

    return Response.json({ success: true });
  } catch (error) {
    return Response.json(
      { error: error?.message || "Nie udało się usunąć produktu" },
      { status: 500 },
    );
  }
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
