import { logoutUser } from "@/app/lib/data/externalAPIgetters";
import styles from "./logout.module.css";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const LogoutButton = () => {
  async function logout(formData: FormData) {
    "use server";
    await logoutUser();
    revalidatePath("/login");
    redirect("/login");
    // mutate data
    // revalidate cache
  }
  return (
    <form action={logout}>
      <button className={`btn ${styles.dropdownBtn}`} type="submit">
        logout
      </button>
    </form>
  );
};

export default LogoutButton;
