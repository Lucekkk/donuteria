import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

// Secret key for JWT - in production, use environment variable
const SECRET_KEY =
  process.env.JWT_SECRET || "your-secret-key-change-this-in-production";
const key = new TextEncoder().encode(SECRET_KEY);

// Token expiration time (7 days for remember me, 1 hour otherwise)
const EXPIRATION_REMEMBER = "7d";
const EXPIRATION_DEFAULT = "1h";  

/**
 * Generate JWT token for authenticated user
 * @param {Object} payload - User data to include in token (userId, email, etc.)
 * @param {boolean} rememberMe - Whether to extend token expiration
 * @returns {Promise<string>} JWT token
 */
export async function generateToken(payload, rememberMe = false) {
  const expirationTime = rememberMe ? EXPIRATION_REMEMBER : EXPIRATION_DEFAULT;

  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expirationTime)
    .sign(key);
}

/**
 * Verify and decode JWT token
 * @param {string} token - JWT token to verify
 * @returns {Promise<Object|null>} Decoded payload or null if invalid
 */
export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, key);
    return payload;
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return null;
  }
}

/**
 * Get current user from request cookies
 * @returns {Promise<Object|null>} User data or null if not authenticated
 */
export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return null;
    }

    const payload = await verifyToken(token);
    return payload;
  } catch (error) {
    console.error("Error getting current user:", error.message);
    return null;
  }
}

/**
 * Set authentication cookie with JWT token
 * @param {string} token - JWT token to store
 * @param {boolean} rememberMe - Whether to extend cookie expiration
 */
export async function setAuthCookie(token, rememberMe = false) {
  const cookieStore = await cookies();
  const maxAge = rememberMe ? 60 * 60 * 24 * 7 : 60 * 60 * 24; // 7 days or 1 day in seconds

  cookieStore.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: maxAge,
    path: "/",
  });
}

/**
 * Clear authentication cookie (logout)
 */
export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
}
