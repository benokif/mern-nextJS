import SmallSidebar from "@/components/SmallSidebar";
import BigSidebar from "@/components/BigSidebar";
import LogoutButton from "@/components/LogoutButton";
import Navbar from "@/components/Navbar";

import styles from "./page.module.css";
import { redirect } from "next/navigation";
import { getAuthCookie, getUser } from "@/app/lib/data/externalAPIgetters";
import { UserRole } from "@/types/backendTypes";
import { cache } from "react";

const Layout = async ({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) => {
  const user = await getUser();

  
  if (!user) return redirect("/login");
  // 🍊 case where somehow user does not have name ?
  // user still valid
  const { name, lastName, role, avatar } = user.data?.userPrivate;

  return (
    <section>
      <main className={styles.dashboard}>
        <SmallSidebar role={role} />
        <BigSidebar role={role} />
        <div>
          <Navbar name={name} lastName={lastName} avatar={avatar}>
            <LogoutButton />
          </Navbar>
          <div className={styles.dashboardPage}>{children}</div>
        </div>
      </main>
    </section>
  );
};

export default Layout;
