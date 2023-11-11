"use client";

import dynamic from "next/dynamic";
import { ReactNode } from "react";

import { toggleSidebar } from "@/store/features/user/userSlice";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useAppDispatch } from "@/store/hooks";

import LogoutContainer from "./LogoutContainer";
import styles from "./navbar.module.css";

const ThemeToggle = dynamic(() => import("./ThemeToggle"), {
  ssr: false, //❗️with ssr: true, wrong icon displayed
});

const Navbar = ({
  name,
  lastName,
  avatar,
  children,
}: {
  name: string;
  lastName: string;
  avatar: string;
  children: ReactNode;
}) => {
  const dispatch = useAppDispatch();
  return (
    <nav className={`nav ${styles.nav}`}>
      <div className={`${styles.navCenter}`}>
        <button
          type="button"
          className={`${styles.toggleBtn}`}
          onClick={() => dispatch(toggleSidebar())}
        >
          <Bars3Icon className={styles.icon} />
        </button>
        <div>
          <h4 className={`${styles.title}`}>dashboard</h4>
        </div>
        <div className={`${styles.btnContainer}`}>
          <ThemeToggle />
          
            <LogoutContainer
              name={name || "name"}
              lastName={lastName || "lastName"}
              avatar={avatar}
            >
              {children}
            </LogoutContainer>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
