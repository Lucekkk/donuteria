/* eslint-disable react/prop-types */
"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import classes from "./UserProfileLink.module.css";

export default function UserProfileLink({
  href,
  imgSrc,
  alt,
  spanContent,
  exact = false,
}) {
    
  const path = usePathname();
  const normalizePath = (value) => value.replace(/\/+$/, "");
  const currentPath = normalizePath(path);
  const targetPath = normalizePath(href);

  const isActive = exact
    ? currentPath === targetPath
    : targetPath === "/"
      ? currentPath === "/"
      : currentPath === targetPath || currentPath.startsWith(`${targetPath}/`);

  return (
    <Link
      className={isActive ? `${classes.link} ${classes.active}` : classes.link}
      href={href}
    >
      <div className={classes.imgBox}>
        <Image src={imgSrc} alt={alt} fill />
      </div>
      <span>{spanContent}</span>
    </Link>
  );
}
