"use client";

import clsx from 'clsx';
import React from "react";
import   NavLinks  from "./NavLinks";

import styles from "./big-sidebar.module.css";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import Logo from "./Logo";
import { UserRole } from "@/types/backendTypes";

const BigSidebar = ({role} : {role: UserRole}) => {
  const pathname = usePathname();
  const isSidebarOpen = useAppSelector((state) => state.user.isSidebarOpen);  
  return (
    <aside className={styles.aside}>
      <div
        className={clsx(styles.sidebarContainer, !isSidebarOpen && styles.showSidebar)
          
            
        }
      >
        <div className={styles.content}>
          <header className={styles.header}>
            <Logo class="" />
          </header>
          <NavLinks isBigSidebar={true} pathname={pathname} role={role}/>
        </div>
      </div>
    </aside>
  );
};

export default BigSidebar;
