import FormRow from "@/components/FormRow";
import styles from "../page.module.css";


import SubmitBtn from "@/components/SubmitBtn";
import { handleFormPost } from "@/app/lib/actions/externalAPIactions";
import { getUser } from "@/app/lib/data/externalAPIgetters";
import { redirect } from "next/navigation";
import FormRowImage from "@/components/FormRowImage";
import { revalidatePath } from "next/cache";
import { addPropertyToFormData } from "@/utils/utility";

const Page = async () => {
  async function create(formData: FormData) {
    "use server";

    // const file = formData.get("avatar") as File;
    const avatar: FormDataEntryValue | null = formData.get("avatar");

    if (!(avatar && typeof avatar === 'object' && "size" in avatar)) {
      throw new Error("The 'avatar' field does not contain a File.");
    }
    const size = (avatar as File).size;
    // Now you can safely cast it to a File and access its properties
    if (avatar && size > 20_000) return;

    // 🔧 form data sanitization
    const name = formData.get("name");
    const lastName = formData.get("lastName");
    const location = formData.get("location");
    const email = formData.get("email");

    const newFormData = new FormData();

    // Add the properties to the new FormData if they exist
    addPropertyToFormData(newFormData, "name", name);
    addPropertyToFormData(newFormData, "lastName", lastName);
    addPropertyToFormData(newFormData, "location", location);
    addPropertyToFormData(newFormData, "email", email);
    addPropertyToFormData(newFormData, "avatar", avatar);
    await handleFormPost(
      newFormData,
      "/users/update-user",
      true,
      true,
      "PATCH"
    );
    
    //🔧 ensure dashboard reloaded with fresh user data
    revalidatePath("/dashboard/profile")
  }

  const user = await getUser();

  // 🧐 this is redundant - is it necessary? done in /dashboard layout, which is a parent
  if (!user) return redirect("/login");

  const localUser = user?.data?.userPrivate;
  return (
    <section className={styles.section}>
      <form
        method="post"
        className={`form ${styles.form}`}
        // @ts-ignore
        action={create}
      >
        <h4 className={styles.formTitle}>profile</h4>
        <div className={styles.formCenter}>
          <FormRowImage
            type="file"
            name="avatar"
            accept="image/*"
            labelText="Select an image file (max 0.5 MB)"
            imageSrc={localUser.avatar}
            customCss={styles.formRow}
          />
          <FormRow
            type="text"
            name="name"
            customCss={styles.formRow}
            defaultValue={localUser.name}
          />
          <FormRow
            type="text"
            name="lastName"
            labelText="last name"
            customCss={styles.formRow}
            defaultValue={localUser.lastName}
          />
          <FormRow
            type="email"
            name="email"
            customCss={styles.formRow}
            defaultValue={localUser.email}
          />
          <FormRow
            type="text"
            labelText="location"
            name="location"
            customCss={styles.formRow}
            defaultValue={localUser.location}
          />
          <SubmitBtn
            formBtn={true}
            customBtn={styles.formBtn}
            pendingBtn={styles.pending}
            isLoading={false}
          />
        </div>
      </form>
    </section>
  );
};

export default Page;
