"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from "./nav-link.module.css";

export default function NavLink({ href, children }) {
  const path = usePathname();

  // Root must match exactly; other links may match subpaths (e.g., /produkty/123)
  const isActive = href === "/" ? path === "/" : path === href || path.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={isActive ? `${classes.link} ${classes.active}` : classes.link}
    >
      {children}
    </Link>
  );
}
