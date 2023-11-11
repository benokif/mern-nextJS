import Link from "next/link";
import { redirect } from "next/navigation";

import { addPropertyToFormData } from "@/utils/utility";

import FormRow from "./FormRow";
import Logo from "./Logo";
import styles from "./form-component.module.css";
import { revalidatePath } from "next/cache";

const FormRegisterComponent = async (props: {
  handleFormPost: (formData: FormData, path: string, multipart: boolean) => Promise<string | void>;
}) => {
  async function create(formData: FormData) {
    "use server";

    // 🔧 form data sanitization
    const name = formData.get('name');
    const lastName = formData.get('lastName');
    const location = formData.get('location');
    const email = formData.get('email');
    const password = formData.get('password');

    const newFormData = new FormData();

    // // Add the properties to the new FormData if they exist
    addPropertyToFormData(newFormData, "name", name);
    addPropertyToFormData(newFormData, "lastName", lastName);
    addPropertyToFormData(newFormData, "location", location);
    addPropertyToFormData(newFormData, "email", email);
    addPropertyToFormData(newFormData, "password", password);

    await props.handleFormPost(newFormData, "/auth/register", false);
    revalidatePath('/login')
    redirect('/login')
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
        <h4 className={styles.title}>Register</h4>
        <FormRow type="text" name="name" />
        <FormRow type="text" name="lastName" labelText="last name" />
        <FormRow type="text" name="location" />
        <FormRow type="email" name="email"  />
        <FormRow type="password" name="password"  />
        <button
          //aria-disabled={isSubmitting}
          type="submit"
          className={`btn btn-block ${styles.btn}`}
        >
          {"submit"}
        </button>
        <p className={styles.text}>
          Already a member ?{" "}
          <Link href="/login" className="member-btn">
            Login
          </Link>
        </p>
      </form>
    </section>
  );
};

export default FormRegisterComponent;
