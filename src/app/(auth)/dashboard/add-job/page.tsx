import { handleFormPost } from "@/app/lib/actions/externalAPIactions";
import FormRow from "@/components/FormRow";
import FormRowSelect from "@/components/FormRowSelect";
import SubmitBtn from "@/components/SubmitBtn";
import { JobType, JobStatus } from "@/types/backendTypes";

import styles from "../page.module.css";
import { redirect } from "next/navigation";
import { addPropertyToFormData } from "@/utils/utility";
import { revalidatePath } from "next/cache";
import { getAuthCookie } from "@/app/lib/data/externalAPIgetters";

const Page = async () => {
  const create = async(formData: FormData) => {
    "use server";
    // 🔧 form data sanitization
    const position = formData.get("position");
    const company = formData.get("company");


    const jobLocation = formData.get("jobLocation");
    const jobStatus = formData.get("jobStatus");
    const jobType = formData.get("jobType");


    const newFormData = new FormData();

    // Add the properties to the new FormData if they exist
    addPropertyToFormData(newFormData, "position", position);
    addPropertyToFormData(newFormData, "company", company);
    addPropertyToFormData(newFormData, "jobLocation", jobLocation);
    addPropertyToFormData(newFormData, "jobStatus", jobStatus);
    addPropertyToFormData(newFormData, "jobType", jobType);


    await handleFormPost(newFormData, "/jobs", false, true);
    revalidatePath("/dashboard/stats");
    revalidatePath("/dashboard/admin");
    revalidatePath("/dashboard/all-jobs");
    redirect("/dashboard/all-jobs");
  }

  return (
    <section className={styles.section}>
      <form
        method="post"
        className={`form ${styles.form}`}
        // @ts-ignore
        action={create}
      >
        <h4 className={styles.formTitle}>add job</h4>
        <div className={styles.formCenter}>
          <FormRow type="text" name="position" customCss={styles.formRow} />
          <FormRow type="text" name="company" customCss={styles.formRow} />
          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            //defaultValue={user.location}
            customCss={styles.formRow}
          />
          <FormRowSelect
            labelText="job status"
            name="jobStatus"
            defaultValue={JobStatus.PENDING}
            list={Object.values(JobStatus)}
            customCss={styles.formRow}
          />
          <FormRowSelect
            labelText="job type"
            name="jobType"
            defaultValue={JobType.FULL_TIME}
            list={Object.values(JobType)}
            customCss={styles.formRow}
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
