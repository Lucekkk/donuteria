/* eslint-disable no-unused-vars */
import { createPortal } from "react-dom";
import NavLink from "../header/Nav-link";
import { useAuth } from "@/lib/useAuth";
import classes from "./Modal.module.css";

export default function Modal({ closeMenu }) {
  const { isAuthenticated, user } = useAuth();
  return createPortal(
    <>
      <div className={classes.modal}>
        <ul className={classes.ul}>
          <li onClick={closeMenu}>
            <NavLink href="/">Strona główna</NavLink>
          </li>
          <li onClick={closeMenu}>
            <NavLink href="/o-nas">O nas</NavLink>
          </li>
          <li onClick={closeMenu}>
            <NavLink href="/produkty">Nasze produkty</NavLink>
          </li>
          <li onClick={closeMenu}>
            <NavLink href="/koszyk">Koszyk</NavLink>
          </li>
          <li onClick={closeMenu}>
            {isAuthenticated && user ? (
              <NavLink href={`/profil/${user.userId}`}>Profil</NavLink>
            ) : (
              <NavLink href="/logowanie">Logowanie</NavLink>
            )}
          </li>
        </ul>
      </div>
    </>,
    document.getElementById("modal"),
  );
}
