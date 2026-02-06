/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { db } from "@/lib/db";

export async function POST(request) {
  try {
    const clientOrder = await request.json();

    console.log(clientOrder);

    
    await db.query(
      `INSERT INTO klienci(id, id_uzytkownik, imie, nazwisko, email, telefon, numer_konta, bank) 
      VALUES(?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        clientOrder.clientID,
        clientOrder.userId,
        clientOrder.name,
        clientOrder.surname,
        clientOrder.email,
        clientOrder.phoneNumber,
        clientOrder.accountNumber,
        clientOrder.bankName,
      ],
    );

    
    await db.query(
      `INSERT INTO adresy(id, id_klient, ulica_i_numer_domu_lub_mieszkania, miejscowosc, kod_pocztowy)
      VALUES(?, ?, ?, ?, ?)`,
      [
        clientOrder.addressID,
        clientOrder.clientID,
        clientOrder.street,
        clientOrder.town,
        clientOrder.postalCode,
      ],
    );
 
     await db.query(
      `INSERT INTO zamowienia(id, id_klient, id_adres, sposob_platnosci, sposob_dostawy, stan_zamowienia, punkty, data_wystawienia, data_zakonczenia_dostawy_towarów, data_platnosci, calkowita_cena_do_zaplaty, numer_faktury) 
      VALUES(?, ?, ?, ?, ?, 'wysłane', ?, CURRENT_DATE(), null, CURRENT_DATE(), ?, ?)`,
      [
        clientOrder.orderID,
        clientOrder.clientID,
        clientOrder.addressID,
        clientOrder.payMethod,
        clientOrder.deliveryMethod,
        clientOrder.donutsPoints,
        clientOrder.totalPrice,
        clientOrder.invoiceNumber,
      ],
    );

    if(clientOrder.userId){
      await db.query(`
        UPDATE uzytkownicy SET punkty = punkty + ? WHERE id = ?;
        `,
        [
          clientOrder.donutsPoints,
          clientOrder.userId
        ]
      )
    }

    for(let i = 0; i < clientOrder.cart.length; i++ ){

    const [rows] = await db.query(`
      INSERT INTO produkty_w_zamowieniu(id, id_zamowienia, id_produktu, ilosc) 
      VALUES (?, ?, ?, ?);`,
      [clientOrder.productsInCartID + i, clientOrder.orderID, clientOrder.cart[i].idProduct, clientOrder.cart[i].quantity],
    );
}
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
