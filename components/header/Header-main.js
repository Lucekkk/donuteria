"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import NavLink from "./Nav-link";
import Modal from "../modal/Modal";
import { useAuth } from "@/lib/useAuth";
import classes from "./Header-main.module.css";

export default function HeaderMain() {
  const [activeBtn, setActiveBtn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const cartItems = useSelector((state) => state.cart.cartData.cart);
  let cartCounter = 0; 

  cartItems.map(prod => cartCounter += prod.quantity);

   ;

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 512px)");
    setIsMobile(mediaQuery.matches);

    const handler = (e) => {
      setIsMobile(e.matches);
    };
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const btnHandler = () => {
    setActiveBtn((prev) => !prev);
  };

  return (
    <header className={classes.header}>
      <h1 className="balooFont">Słodki donut</h1>

      <nav className={classes.nav}>
        {isMobile === true ? (
          <>
            <button className={classes.buttonBurger} onClick={btnHandler}>
              <span className={classes.hamburgerBox}>
                <span
                  className={
                    activeBtn === true
                      ? `${classes.hamburgerInner} ${classes.active}`
                      : classes.hamburgerInner
                  }
                ></span>
              </span>
            </button>
            {activeBtn === true ? <Modal closeMenu={btnHandler} /> : null}
          </>
        ) : (
          <ul>
            <li>
              <NavLink href="/">Strona główna</NavLink>
            </li>
            <li>
              <NavLink href="/o-nas">O nas</NavLink>
            </li>
            <li>
              <NavLink href="/produkty">Nasze produkty</NavLink>
            </li>
            <li>
              <NavLink href="/koszyk">
                 Koszyk <div className={classes.cartCounter}>{isClient ? cartCounter : 0}</div>
              </NavLink>
            </li>
            <li>
              {isAuthenticated && user ? (
                <NavLink href={`/profil/${user.userId}`}>Profil</NavLink>
              ) : (
                <NavLink href="/logowanie">Logowanie</NavLink>
              )}
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}
