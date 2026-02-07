/* eslint-disable no-undef */
import { db } from "@/lib/db";

export async function POST(request) {
  try {
    const payload = await request.json();
    const userData = payload?.userData ?? payload;
    // console.log(userData);
    let newClientID = Date.now();
    let newAddressID = null;
    

  if(userData.clientID){
    await db.query(`
          UPDATE klienci
          SET imie = ?, nazwisko = ?, telefon = ?
          WHERE id = ?
      `,
      [userData.name, userData.surname, userData.phoneNumber, userData.clientID]
      )

  }else{
    await db.query(`
        INSERT INTO klienci(id, id_uzytkownik, imie, nazwisko, email, telefon, numer_konta, bank)
        VALUES(?, ?, ?, ?, ?, ?, null, null)
      `,
      [newClientID, userData.userID, userData.name, userData.surname, userData.email, userData.phoneNumber]
    )
}

    if(userData.clientID){
      await db.query(`
        UPDATE adresy 
        SET ulica_i_numer_domu_lub_mieszkania = ?, miejscowosc = ?, kod_pocztowy = ? 
        WHERE id_klient = ?;
        `,
        [userData.street, userData.town, userData.postalCode, userData.clientID]
    );
    }else{
      newAddressID = newClientID + 1;
       await db.query(`
          INSERT INTO adresy(id, id_klient, ulica_i_numer_domu_lub_mieszkania, miejscowosc, kod_pocztowy)
          VALUES(?, ?, ?, ?, ?)
        `,
        [newAddressID, newClientID, userData.street, userData.town, userData.postalCode]
      )
    }

     


    const [rows] = await db.query(`
        UPDATE uzytkownicy
        SET email = ?
        WHERE id = ?   
        `,
        [userData.email, userData.userID]
)


    return Response.json(rows);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function editUser(userData) {
  //  await new Promise (resolve => setTimeout(resolve, 5000));
  // throw new Error();
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/editUserData`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}
