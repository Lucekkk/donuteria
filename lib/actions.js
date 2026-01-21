"use server";

import { getUsers } from "@/app/api/getUsers/route";
import { sendRegisterInfo } from "@/app/api/register/route";
import { redirect } from "next/navigation";


const loginRegex = /^[a-zA-Z0-9_.-]{1,35}$/;
const emailRegex = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const passwordRegex = /^(?=.*\d)(?=.*[A-Z]).{8,20}$/;


function isInvalidText(text){
  return !text || text.trim() === '';
}


function isValidLogin(login){
  return loginRegex.test(login);
}


function isValidEmail(email){
  return emailRegex.test(email);
}

function isValidPassword(password){
  return passwordRegex.test(password);
}



export async function registerUser(prevState, formData) {
  // await new Promise (resolve => setTimeout(resolve, 5000));
  const users = await getUsers();

  const newUser = {
    login: formData.get("login"),
    email: formData.get("email"),
    password_hash: formData.get("password"),
  };

  if(
      isInvalidText(newUser.login) ||
      isInvalidText(newUser.email) ||
      isInvalidText(newUser.password_hash)
    ){
      return {
        message: "Uzupełnij dane",
        values: {
          login: newUser.login || '',
          email: newUser.email || '',
          password_hash: newUser.password_hash || ''
        }
      };
    }


    if(!isValidLogin(newUser.login)){
      return { 
        message: "Login musi mieć długość między 1 a 35 znaków",
        values: {
          login: newUser.login || '',
          email: newUser.email || '',
          password_hash: newUser.password_hash || ''
        } 
      };
    }
  

  const loginTaken = users.some((user) => user.login === newUser.login.trim());
  if (loginTaken) {
    return { 
        message: "Nazwa loginu jest już zarezerowana",
        values: {
          login: newUser.login || '',
          email: newUser.email || '',
          password_hash: newUser.password_hash || ''
        } 
      };
  }


  if(!isValidEmail(newUser.email)){
    return {
      message: "Wpisz poprawny email",
        values: {
          login: newUser.login || '',
          email: newUser.email || '',
          password_hash: newUser.password_hash || ''
        }}
  }


  const emailTaken = users.some((user) => user.email === newUser.email.trim());
  if (emailTaken) {
    return { 
        message: "Ten email jest już zajęty",
        values: {
          login: newUser.login || '',
          email: newUser.email || '',
          password_hash: newUser.password_hash || ''
        }
       };
  }

  

  if(!isValidPassword(newUser.password_hash)){
      return{ 
        message: "Hasło musi mieć od 8 do 20 znaków, oraz posiadać jedną cyfrę i jedną, wielką literę",
        values: {
          login: newUser.login || '',
          email: newUser.email || '',
          password_hash: newUser.password_hash || ''
        }
       };

  }





 

  await sendRegisterInfo(newUser);
  redirect("/rejestracja/register-done");
}
