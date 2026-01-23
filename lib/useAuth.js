"use client";

import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuth, clearAuth, setLoading } from "@/store/auth-slice";

export function useAuth() {
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  const checkAuth = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const response = await fetch("/api/auth/check");
      const data = await response.json();

      if (data.isAuthenticated) {
        dispatch(setAuth(data.user));
      } else {
        dispatch(clearAuth());
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      dispatch(clearAuth());
    }
  }, [dispatch]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return { isAuthenticated, user, loading, refreshAuth: checkAuth };
}
