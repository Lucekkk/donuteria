import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";
import classes from "./UserProfileLayout.module.css";
import Image from "next/image";

import userImg from '@/assets/userPanelIcons/user.png';
import userDataImg from '@/assets/userPanelIcons/userData.png';
import ordersImg from '@/assets/userPanelIcons/orders.png';
import settinsgImg from '@/assets/userPanelIcons/settings.png';
import currencyImg from '@/assets/userPanelIcons/currency.png';


import LogoutButton from "./LogoutButton";
import UserProfileLink from "./UserProfileLink";

export default async function UserProfileLayout() {
  const currentUser = await getCurrentUser();

  return (
    <>
      <aside className={classes.aside}>
        <div className={classes.linksBox}>
            <UserProfileLink href={`/profil/${currentUser.userId}`} imgSrc={userImg} alt={'user icon'} spanContent={'Moje konto'}/>
            {/* <Link className={classes.link} href={`/profil/${currentUser.userId}`}> 
                <div className={classes.imgBox}>
                    <Image src={userImg} alt="user icon" fill/>
                </div>
                <span>Moje konto</span> 
            </Link> */}
            <Link className={classes.link} href={`/profil/${currentUser.userId}/dane-personalne`}> 
                <div className={classes.imgBox}>
                    <Image src={userDataImg} alt="user data icon" fill/>
                </div>
                <span>Dane personalne</span>
            </Link>
            <Link className={classes.link} href={`/profil/${currentUser.userId}/zamowienia`}>
                <div className={classes.imgBox}>
                        <Image src={ordersImg} alt="order icon" fill/>
                </div>
                <span>Moje zamówienia</span>
            </Link>
            <Link className={classes.link} href={`/profil/${currentUser.userId}/ustawienia-konta`}>
                <div className={classes.imgBox}>
                        <Image src={settinsgImg} alt="settings icon" fill/>
                </div>
                <span>Ustawienia konta</span>
            </Link>
            <Link className={classes.link} href={`/profil/${currentUser.userId}/wirtualne-donuty`}>
                <div className={classes.imgBox}>
                        <Image src={currencyImg} alt="currency icon" fill/>
                </div>
                <span>Wirtualne donuty</span>
            </Link>
            <LogoutButton/>
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
