"use client";

import { useActionState } from "react";
import { loginUser } from "@/lib/actions";
import Link from "next/link";
import classes from "./page.module.css";

export default function Logowanie() {
  const [state, formAction, isPending] = useActionState(loginUser, {
    message: null,
    values: {},
  });

  console.log(state.message);
  return (
    <>
      <main className={classes.main}>
        <div className={classes.loginPanel}>
          <h1>Logowanie</h1>

          <form action={formAction}>
            <div className={classes.labelAndInputBox}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={state.values?.email || ""}
                placeholder="Podaj email"
                // required
              />
            </div>

            <div className={classes.labelAndInputBox}>
              <label htmlFor="password">Hasło</label>
              <input
                type="password"
                id="password"
                name="password"
                defaultValue={state.values?.password_hash || ""}
                // required
                placeholder="Podaj hasło"
              />
            </div>
            <div className={classes.checkboxContainer}>
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                className={classes.checkboxInput}
                defaultChecked={state.values?.isChecked || false}
              />
              <label htmlFor="rememberMe" className={classes.checkboxLabel}>
                Zapamiętaj mnie
              </label>
            </div>

            {state.message ===
              "Wprowadzone dane użytkownika są niepoprawne" && (
              <p className={classes.errorMessage}>{state.message}</p>
            )}
            {state.message === "Uzupełnij dane" && (
              <p className={classes.errorMessage}>{state.message}</p>
            )}

            <div className={classes.btnContainer}>
              <button disabled={isPending}>
                {isPending === true ? "Oczekiwanie" : "ZALOGUJ"}
              </button>
            </div>

            <Link href="/rejestracja" className={classes.link}>
              NIE MASZ KONTA? ZAREJESTRUJ SIĘ
            </Link>

            <div className={classes.hrBox}>
              <hr />
              <p>LUB</p> <hr />
            </div>

            <div className={classes.loginOtherMethodBtn}>
              <a href="#">GOOGLE</a>
              <a href="#">FACEBOOK</a>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
