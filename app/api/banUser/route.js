/* eslint-disable no-undef */
import { db } from "@/lib/db";

export async function POST(request) {
  try {
    const { userId, reason } = await request.json();

    if (!userId || !reason || !reason.trim()) {
      return Response.json(
        { error: "Brakuje danych do bana" },
        { status: 400 },
      );
    }

    const [result] = await db.query(
      `
        UPDATE uzytkownicy
        SET czyZbanowany = 1, powod_bana = ?
        WHERE id = ?
      `,
      [reason.trim(), userId],
    );

    return Response.json({ success: true, result });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
