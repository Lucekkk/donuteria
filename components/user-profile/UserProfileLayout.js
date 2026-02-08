import { getCurrentUser } from "@/lib/auth";

import classes from "./UserProfileLayout.module.css";

import userImg from "@/assets/userPanelIcons/user.png";
import userDataImg from "@/assets/userPanelIcons/userData.png";
import ordersImg from "@/assets/userPanelIcons/orders.png";
import settinsgImg from "@/assets/userPanelIcons/settings.png";
import currencyImg from "@/assets/userPanelIcons/currency.png";

import LogoutButton from "./LogoutButton";
import UserProfileLink from "./UserProfileLink";

export default async function UserProfileLayout() {
  const currentUser = await getCurrentUser();

  return (
    <>
      <aside className={classes.aside}>
        <div className={classes.linksBox}>
          <UserProfileLink
            href={`/profil/${currentUser.userId}`}
            imgSrc={userImg}
            alt={"user icon"}
            spanContent={"Moje konto"}
            exact
          />
          <UserProfileLink
            href={`/profil/${currentUser.userId}/dane-personalne`}
            imgSrc={userDataImg}
            alt={"user data icon"}
            spanContent={"Dane personalne"}
          />
          <UserProfileLink
            href={`/profil/${currentUser.userId}/zamowienia`}
            imgSrc={ordersImg}
            alt={"order icon"}
            spanContent={"Moje zamówienia"}
          />
          <UserProfileLink
            href={`/profil/${currentUser.userId}/ustawienia-konta`}
            imgSrc={settinsgImg}
            alt={"settings icon"}
            spanContent={"Ustawienia konta"}
          />
          <UserProfileLink
            href={`/profil/${currentUser.userId}/wirtualne-donuty`}
            imgSrc={currencyImg}
            alt={"currency icon"}
            spanContent={"Wirtualne donuty"}
          />
          <LogoutButton />
        </div>
        <div className={classes.codeBox}>
          <h3>Twój kod do zbierania wirtualnych donutów</h3>
          <p>29438</p>
        </div>
        <div className={classes.contactBox}>
          <p>Masz jakies pytania?</p>
          <p>Zadzwoń lub napisz</p>
          <p>654 678 765</p>
          <p>kontakt@slodkidonut.pl</p>
        </div>
      </aside>
    </>
  );
}
