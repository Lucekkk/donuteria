import { db } from "@/lib/db";

export async function POST(request) {
  try {
    const newUser = await request.json();

    const [rows] = await db.query(
      `INSERT INTO uzytkownicy(login, email, haslo_hash, data_utworzenia, rola)
       VALUES(?, ?, ?, CURRENT_DATE(), 'user')`,
      [newUser.login, newUser.email, newUser.haslo_hash],
    );

    return Response.json({
      success: true,
      message: "Użytkownik zarejestrowany!",
    });
  } catch (error) {
    console.error("Błąd przy rejestracji:", error);
    return Response.json(
      { success: false, message: "Błąd przy rejestracji" },
      { status: 500 },
    );
  }
}

export async function sendRegisterInfo(newUser) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Nie udało się zarejestrować");
  return res.json();
}
