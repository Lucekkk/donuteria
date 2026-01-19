"use server";

import { sendRegisterInfo } from "@/app/api/register/route";
import {redirect} from 'next/navigation';

export async function registerUser(prevState, formData) {
  const newUser = {
    login: formData.get("login"),
    email: formData.get("email"),
    haslo_hash: formData.get("password"),
  };
  if (!newUser.email) {
    return { message: "Email wymagany!" };
  }

  await sendRegisterInfo(newUser);
  redirect('/rejestracja/register-done');
}
