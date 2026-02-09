// 'use client';
/* eslint-disable react/prop-types */
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import classes from "./page.module.css";

import ProfileAuthRefresh from "@/components/ProfileAuthRefresh";
import { getUser } from "@/app/api/getUser/route";
import Link from "next/link";

export default async function UserProfile({ params }) {
  const { id } = await params;
  let completeDataInfo = null;

  // Get current authenticated user
  const currentUser = await getCurrentUser();

  // This shouldn't happen due to middleware, but as a safety check
  if (!currentUser) {
    redirect("/logowanie");
  }

  // Double-check that the user is accessing their own profile
  if (currentUser.userId.toString() !== id) {
    redirect(`/profil/${currentUser.userId}`);
  }

  if (currentUser.role === "admin") {
    return (
      <>
        <main className={classes.main}>
          <ProfileAuthRefresh />
          <h1>Panel administratora</h1>
          <div className={classes.userDataBox}>
            <div className={classes.dataContainer}>
              <h2>Zalogowano jako:</h2>
            </div>
            <div className={classes.dataContainer}>
              <p>{currentUser.login}</p>
              <p className={classes.rightText}>{currentUser.email}</p>
            </div>
          </div>
        </main>
      </>
    );
  }

  const clientData = await getUser(currentUser.userId);

  // console.log(clientData);
  // console.log(currentUser);
  if (
    !clientData[0]?.name ||
    !clientData[0]?.surname ||
    !clientData[0]?.street ||
    !clientData[0]?.postalCode ||
    !clientData[0]?.town ||
    !clientData[0]?.phoneNumber
  ) {
    completeDataInfo = <p>Uzupełnij resztę, brakujących danych.</p>;
  }

  //  console.log(currentUser)
  return (
    <>
      <main className={classes.main}>
        <ProfileAuthRefresh />
        <h1>Witaj, {currentUser.login}!</h1>

        <div className={classes.userDataBox}>
          <div className={classes.dataContainer}>
            <h2>Dane personalne:</h2>
            <h2>Adres: </h2>
          </div>

          <div className={classes.dataContainer}>
            <p>
              {clientData[0]?.name} {clientData[0]?.surname}
            </p>
            <p className={classes.rightText}> ul. {clientData[0]?.street}</p>
          </div>

          <div className={classes.dataContainer}>
            <p>Email: {currentUser.email}</p>
            <p className={classes.rightText}>
              {clientData[0]?.postalCode} {clientData[0]?.town}
            </p>
          </div>

          <div className={classes.dataContainer}>
            <p>Numer telefonu: {clientData[0]?.phoneNumber}</p>
          </div>

          <div className={classes.linkContainer}>
            <Link href={`/profil/${currentUser.userId}/dane-personalne`}>
              Edytuj dane
            </Link>
          </div>
          {completeDataInfo}
        </div>
      </main>
    </>
  );
}
