/* eslint-disable no-unused-vars */
import { NextResponse } from "next/server";
import { clearAuthCookie } from "@/lib/auth";

export async function POST(request) {
  try {
    // Clear authentication cookie
    await clearAuthCookie();

    return NextResponse.json(
      {
        success: true,
        message: "Wylogowano pomyślnie",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Wystąpił błąd podczas wylogowania" },
      { status: 500 },
    );
  }
}
