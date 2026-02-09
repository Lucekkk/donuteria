/* eslint-disable no-undef */
import { db } from "@/lib/db";

export async function POST(request) {
  try {
    const getInfo = await request.json();
    
    if (!getInfo?.userId) {
        return Response.json({ error: "Missing userId" }, { status: 400 });
    }
    // console.log(getInfo)

    if(getInfo.limit){

        const [rows] = await db.query(`
            SELECT 
              zamowienia.id, 
              zamowienia.data_wystawienia AS orderDate, 
              zamowienia.calkowita_cena_do_zaplaty AS price, 
              zamowienia.stan_zamowienia AS status, 
              zamowienia.punkty AS points 
            FROM klienci
            INNER JOIN uzytkownicy ON uzytkownicy.id = klienci.id_uzytkownik
            INNER JOIN zamowienia ON zamowienia.id_klient = klienci.id
            WHERE uzytkownicy.id = ?
            ORDER BY zamowienia.data_wystawienia DESC
            LIMIT 3;
            `,
        [getInfo.userId]
        );


        return Response.json(rows);
    }else{

         const [rows] = await db.query(`
            SELECT zamowienia.id, zamowienia.sposob_platnosci, zamowienia.sposob_dostawy, zamowienia.data_wystawienia, zamowienia.calkowita_cena_do_zaplaty, zamowienia.stan_zamowienia, zamowienia.punkty, zamowienia.data_zakonczenia_dostawy_towarów, zamowienia.data_platnosci, zamowienia.numer_faktury
            FROM klienci
            INNER JOIN uzytkownicy ON uzytkownicy.id = klienci.id_uzytkownik
            INNER JOIN zamowienia ON zamowienia.id_klient = klienci.id
            WHERE uzytkownicy.id = ?
            ORDER BY zamowienia.data_wystawienia DESC;
            `,
        [getInfo.userId]
        );


        return Response.json(rows);
    }


  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function getOrders(userId, limit) {
  //  await new Promise (resolve => setTimeout(resolve, 5000));
  // throw new Error();
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/getOrders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, limit }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch order data");
  return res.json();
}
