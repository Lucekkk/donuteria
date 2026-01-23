"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearAuth } from "@/store/auth-slice";

export default function TokenValidityChecker() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check token validity every 5 seconds
    const intervalId = setInterval(async () => {
      try {
        const response = await fetch("/api/auth/check");
        const data = await response.json();

        if (!data.isAuthenticated) {
          console.log("Token expired - clearing auth state");
          dispatch(clearAuth());
        }
      } catch (error) {
        console.error("Error checking token validity:", error);
      }
    }, 5000); // Check every 5 seconds

    return () => clearInterval(intervalId);
  }, [dispatch]);

  return null;
}
