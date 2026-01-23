import { NextResponse } from "next/server";
import argon2 from "argon2";
import { getUsers } from "../getUsers/route";
import { generateToken, setAuthCookie } from "@/lib/auth";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password, rememberMe } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: "Uzupełnij dane" }, { status: 400 });
    }

    // Get all users
    const users = await getUsers();

    // Find user by email
    const foundUser = users.find((user) => user.email === email);

    if (!foundUser) {
      return NextResponse.json(
        { error: "Wprowadzone dane użytkownika są niepoprawne" },
        { status: 401 },
      );
    }

    // Verify password
    const valid = await argon2.verify(foundUser.password_hash, password);

    if (!valid) {
      return NextResponse.json(
        { error: "Wprowadzone dane użytkownika są niepoprawne" },
        { status: 401 },
      );
    }

    // Generate JWT token
    const token = await generateToken(
      {
        userId: foundUser.id,
        email: foundUser.email,
        login: foundUser.login,
      },
      rememberMe,
    );

    // Set cookie
    await setAuthCookie(token, rememberMe);

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Zalogowano pomyślnie",
        userId: foundUser.id,
        login: foundUser.login,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Wystąpił błąd podczas logowania" },
      { status: 500 },
    );
  }
}
