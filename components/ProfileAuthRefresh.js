"use client";

import { useEffect } from "react";
import { useAuth } from "@/lib/useAuth";

export default function ProfileAuthRefresh() {
  const { refreshAuth } = useAuth();

  useEffect(() => {
    // Refresh auth state when profile page loads (after login)
    refreshAuth();
  }, [refreshAuth]);

  return null;
}
