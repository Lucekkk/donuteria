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
    <div className={classes.buttonsContainer} onClick={handleLogout}>
      <div  
        className={classes.logoutButtonImg}
      >
        <Image  src={logoutImg} alt="logout icon" fill/>  
      </div>
        <span>Wyloguj się</span>
    </div>
  );
}
