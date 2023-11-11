"use client";

import links from "@/utils/links";
import Link from "next/link";
import stylesBig from "./big-sidebar.module.css";
import styles from "./small-sidebar.module.css";
import { UserRole } from "@/types/backendTypes";
import clsx from "clsx";


type LinksProps = {
  pathname: string;
  isBigSidebar: boolean;
  role: UserRole;
  handleClick?: () => {
    payload: undefined;
    type: "user/toggleSidebar";
  };
};
const NavLinks = ({ handleClick ,pathname, isBigSidebar, role }: LinksProps) => {
  const usedStyle = isBigSidebar ? stylesBig : styles;

  return (
    <div className={usedStyle.navLinks}>
      {links.map(({ text, path, icon }) => {
        if (path === "/dashboard/admin" && role !== "ADMIN") return;

        return (
          <Link
            href={path}
            key={text}
            onClick={handleClick}
            className={
              clsx(usedStyle.navLink, (pathname === path) && usedStyle.active)
            }
          >
            <span className={usedStyle.icon}>{icon}</span>
            <span>{text}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default NavLinks;
