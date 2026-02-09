/* eslint-disable react/prop-types */
// app/profil/[id]/dane-personalne/UserDataClient.js
"use client";

import { useActionState, useTransition } from "react";
import { editUserData } from "@/lib/actions";
import classes from "./UserDataClient.module.css";
import Link from "next/link";

export default function UserEditData({
  currentUser,
  clientData = [
    {
      name: "",
      surname: "",
      phoneNumber: "",
      street: "",
      town: "",
      postalCode: "",
    },
  ],
}) {
  const [state, formAction, isPending] = useActionState(editUserData, {
    message: null,
    values: {},
  });

  const [isTransitioning, startTransition] = useTransition();

  const client = clientData?.[0] ?? {};
//   console.log(clientData);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    formData.append("clientID", client.customerID ?? "");
    formData.append("userID", currentUser?.userId ?? "");

    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <main className={classes.main}>
      <h1>Dane Personalne</h1>
      <p>
        W przypadku po dokonaniu zmiany emaila, loginu, lub hasła, prosi się o
        wylogowanie.
      </p>
      <form onSubmit={handleFormSubmit}>
        <div className={classes.userDataInputsBox}>
          <div className={classes.inputBox}>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={client.name || state.values?.name || ""}
              placeholder="Imię"
              required
            />
          </div>

          <div className={classes.inputBox}>
            <input
              type="text"
              id="surname"
              name="surname"
              defaultValue={client.surname || state.values?.surname || ""}
              placeholder="Nazwisko"
              required
            />
          </div>

          <div className={classes.inputBox}>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={currentUser?.email || state.values?.email || ""}
              placeholder="Email"
              required
            />
          </div>

          <div className={classes.inputBox}>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              defaultValue={
                client.phoneNumber || state.values?.phoneNumber || ""
              }
              placeholder="Numer tel."
              required
            />
          </div>

          <div className={classes.inputBox}>
            <input
              type="text"
              id="street"
              name="street"
              defaultValue={client.street || state.values?.street || ""}
              placeholder="Ulica i numer domu / mieszkania"
              required
            />
          </div>

          <div className={classes.inputBox}>
            <input
              type="text"
              id="town"
              name="town"
              defaultValue={client.town || state.values?.town || ""}
              placeholder="Miejscowość"
              required
            />
          </div>

          <div className={classes.inputBox}>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              placeholder="Kod pocztowy"
              maxLength="6"
              inputMode="numeric"
              defaultValue={client.postalCode || state.values?.postalCode || ""}
              required
            />
          </div>

          <div className={classes.buttons}>
            <Link href="/profil/3">Anuluj</Link>
            <button>Zapisz</button>
          </div>
          <div className={classes.errorBox}>
            <div className={classes.error}>
              {state.message === "Uzupełnij dane"
                ? state.message
                : null}
            </div>
            <div className={classes.error}>
              {state.message === "Nieodpowiednia długość znaków"
                ? state.message
                : null}
            </div>
            <div className={classes.error}>
              {state.message === "Wpisz poprawny email" ? state.message : null}
            </div>
            <div className={classes.error}>
              {state.message === "Wpisz poprawny numer telefonu"
                ? state.message
                : null}
            </div>
            <div className={classes.error}>
              {state.message === "Wpisz poprawny kod pocztowy"
                ? state.message
                : null}
            </div>
           </div>
        </div>
      </form>
    </main>
  );
}
