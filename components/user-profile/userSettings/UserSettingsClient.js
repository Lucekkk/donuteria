/* eslint-disable react/prop-types */
"use client";

import { useActionState, useTransition } from "react";
import { editUserAccount } from "@/lib/actions";
import classes from "./UserSettingsClient.module.css";
import Link from "next/link";

export default function UserSettingsClient({ currentUser }) {
  const [state, formAction] = useActionState(editUserAccount, {
    message: null,
    values: {},
  });

  const [, startTransition] = useTransition();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    formData.append("userID", currentUser?.userId ?? "");

    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <main className={classes.main}>
      <h1>Ustawienia konta</h1>
      <p>
        W przypadku po dokonaniu zmiany loginu lub hasla, prosi sie o
        wylogowanie.
      </p>
      <form onSubmit={handleFormSubmit}>
        <div className={classes.userDataInputsBox}>
          <div className={classes.inputBox}>
            <input
              type="text"
              id="login"
              name="login"
              defaultValue={currentUser?.login || state.values?.login || ""}
              placeholder="Login"
              required
            />
          </div>

          <div className={classes.inputBox}>
            <input
              type="password"
              id="password"
              name="password"
              defaultValue={state.values?.password_hash || ""}
              placeholder="Nowe haslo"
              required
            />
          </div>

          <div className={classes.inputBox}>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              defaultValue={state.values?.confirmPassword || ""}
              placeholder="Potwierdz haslo"
              required
            />
          </div>

          <div className={classes.buttons}>
            <Link href={`/profil/${currentUser?.userId ?? ""}`}>Anuluj</Link>
            <button>Zapisz</button>
          </div>
          <div className={classes.errorBox}>
            <div className={classes.error}>
              {state.message === "Uzupełnij dane" ? state.message : null}
            </div>
            <div className={classes.error}>
              {state.message === "Login musi mieć długość między 1 a 35 znaków"
                ? state.message
                : null}
            </div>
            <div className={classes.error}>
              {state.message === "Nazwa loginu jest już zarezerowana"
                ? state.message
                : null}
            </div>
            <div className={classes.error}>
              {state.message ===
              "Hasło musi mieć od 8 do 20 znaków, oraz posiadać jedną cyfrę i jedną, wielką literę"
                ? state.message
                : null}
            </div>
            <div className={classes.error}>
              {state.message === "Hasla musza byc takie same"
                ? state.message
                : null}
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}
