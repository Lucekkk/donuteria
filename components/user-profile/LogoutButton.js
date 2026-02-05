"use client";

import classes from './LogoutButton.module.css';
import Image from 'next/image';

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearAuth } from "@/store/auth-slice";

import logoutImg from '@/assets/userPanelIcons/logout.png';

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
      className={classes.logoutButton}
    >
      <Image  src={logoutImg} fill/>
      <span>Wyloguj się</span>
      
    </button>
  );
}
