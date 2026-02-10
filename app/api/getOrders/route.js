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
            SELECT 
              zamowienia.id, 
              zamowienia.sposob_platnosci AS payment_method, 
              zamowienia.sposob_dostawy AS delivery_method, 
              zamowienia.data_wystawienia AS order_date, 
              zamowienia.calkowita_cena_do_zaplaty AS total_price, 
              zamowienia.stan_zamowienia AS status, 
              zamowienia.punkty AS points, 
              zamowienia.data_zakonczenia_dostawy_towarów AS delivery_end_date, 
              zamowienia.data_platnosci AS payment_date, 
              zamowienia.numer_faktury AS invoice_number,
              producenci.nazwa AS producer_name,
              producenci.adres AS producer_address,
              producenci.NIP AS producer_nip,
              klienci.imie AS client_first_name,
              klienci.nazwisko AS client_last_name,
              adresy.ulica_i_numer_domu_lub_mieszkania AS client_street,
              adresy.kod_pocztowy AS client_postal_code,
              adresy.miejscowosc AS client_city,
              produkty_w_zamowieniu.ilosc AS product_quantity,
              produkty.cena_netto AS product_net_price,
              produkty.stawka_vat AS product_vat_rate,
              produkty.kwota_vat AS product_vat_amount,
              produkty.cena_brutto AS product_gross_price,
              produkty.nazwa AS product_name,
              zamowienia.koszt_dostarczenia AS delivery_cost
            FROM klienci
              INNER JOIN uzytkownicy ON uzytkownicy.id = klienci.id_uzytkownik
              INNER JOIN zamowienia ON zamowienia.id_klient = klienci.id
              INNER JOIN produkty_w_zamowieniu ON produkty_w_zamowieniu.id_zamowienia = zamowienia.id
              INNER JOIN produkty ON produkty.id = produkty_w_zamowieniu.id_produktu
              INNER JOIN producenci ON produkty.id_producenta = producenci.id
              INNER JOIN adresy ON adresy.id_klient = klienci.id
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
