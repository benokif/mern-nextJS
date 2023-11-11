import { UserCircleIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

import styles from "./logout.module.css";

import { ReactNode, Suspense } from "react";

const LogoutContainer = ({
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
  return (
    <div className={styles.container}>
      <input type="checkbox" id="logout" className="toggle" />
      <Suspense fallback={<div>loading...</div>}>
        <label htmlFor="logout" className={`btn toggler ${styles.logoutBtn}`}>
          {avatar ? (
            <img src={avatar} alt="avatar" className={styles.img} />
          ) : (
            <UserCircleIcon />
          )}
          {name} {lastName}
          <ChevronDownIcon />
        </label>
      </Suspense>
      <div
        className={`
            hide-show ${styles.dropdown}
        `}
      >
        {children}
      </div>
    </div>
  );
};

export default LogoutContainer;
