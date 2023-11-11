"use client";

import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";


import styles from "./small-sidebar.module.css";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleSidebar } from "@/store/features/user/userSlice";
import NavLinks from "./NavLinks";
import Logo from "./Logo";
import { UserRole } from "@/types/backendTypes";
import clsx from "clsx";

const SmallSidebar = ({ role }: { role: UserRole }) => {
  const pathname = usePathname();
  const isSidebarOpen = useAppSelector((state) => state.user.isSidebarOpen);
  const dispatch = useAppDispatch();

  const handleClick = () => dispatch(toggleSidebar());

  return (
    <aside className={styles.aside}>
      <div
        className=
          {clsx(styles.sidebarContainer, isSidebarOpen && styles.showSidebar)
        }
      >
        <div className={styles.content}>
          <button
            className={styles.closeBtn}
            onClick={() => dispatch(toggleSidebar())}
          >
            <XMarkIcon className={styles.heroIcon} />
          </button>
          <header>
            <Logo class="" />
          </header>
          <NavLinks handleClick={handleClick} isBigSidebar={false} pathname={pathname} role={role} />
        </div>
      </div>
    </aside>
  );
};

export default SmallSidebar;
