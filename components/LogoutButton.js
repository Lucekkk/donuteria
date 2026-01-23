"use client";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearAuth } from "@/store/auth-slice";

export default function LogoutButton() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });

      if (response.ok) {
        dispatch(clearAuth());
        router.push("/logowanie");
        router.refresh();
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer" }}
    >
      Wyloguj się
    </button>
  );
}
