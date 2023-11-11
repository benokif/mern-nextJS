import Link from "next/link";
import { redirect } from "next/navigation";

import { addPropertyToFormData } from "@/utils/utility";

import FormRow from "./FormRow";
import Logo from "./Logo";
import styles from "./form-component.module.css";
import { revalidatePath } from "next/cache";

const FormLoginComponent = ({
  handleFormPost: handle,
}: {
  handleFormPost: (
    formData: FormData,
    path: string,
    multipart: boolean,
  ) => Promise<string | void>;
}) => {

  async function create(formData: FormData) {
    "use server";

    // 🔧 form data sanitization
    const email = formData.get("email");
    const password = formData.get("password");

    const newFormData = new FormData();

    // // Add the properties to the new FormData if they exist
    addPropertyToFormData(newFormData, "email", email);
    addPropertyToFormData(newFormData, "password", password);

    await handle(newFormData, "/auth/login", false);
    revalidatePath("/dashboard");
    redirect("/dashboard");
    // mutate data
    // revalidate cache
  }
  async function loginTest(formData: FormData) {
    "use server";

    formData.append("email", "test@gmail.com");
    formData.append("password", "secret");

    await handle(formData, "/auth/login", false);
    revalidatePath("/dashboard");
    redirect("/dashboard");
    //redirect('/register')
    // mutate data
    // revalidate cache
  }
  return (
    <section className={styles.section}>
      <form
        className={`form ${styles.form}`}
        method="post"
        // @ts-ignore
        action={create}
      >
        <Logo class={styles.logo} />
        <h4 className={styles.title}>login</h4>
        <FormRow type="email" name="email" />
        <FormRow type="password" name="password" />

        <button type="submit" className={`btn btn-block ${styles.btn}`}>
          {"login"}
        </button>

        <p className={styles.text}>
          Not a member yet?{" "}
          <Link href="/register" className="member-btn">
            Register
          </Link>
        </p>
      </form>
      <form
        method="post"
        className={styles.demoForm}
        // @ts-ignore
        action={loginTest}
      >
        {" "}
        <button
          type="submit"
          className={`btn btn-block ${styles.btn} ${styles.demoBtn}`}
        >
          demo try
        </button>
      </form>
    </section>
  );
};

export default FormLoginComponent;
