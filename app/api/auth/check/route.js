import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { isAuthenticated: false, user: null },
        { status: 200 },
      );
    }

    return NextResponse.json(
      {
        isAuthenticated: true,
        user: {
          userId: user.userId,
          email: user.email,
          login: user.login,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json(
      { isAuthenticated: false, user: null },
      { status: 200 },
    );
  }
}
