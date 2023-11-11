import { Job, JobStatus, JobType } from "@/types/backendTypes";
import styles from "../page.module.css";
import FormRow from "@/components/FormRow";
import FormRowSelect from "@/components/FormRowSelect";
import SubmitBtn from "@/components/SubmitBtn";
import { redirect } from "next/navigation";
import { handleFormPost } from "@/app/lib/actions/externalAPIactions";
import Link from "next/link";
import { getJob } from "@/app/lib/data/externalAPIgetters";
import { addPropertyToFormData } from "@/utils/utility";
import { revalidatePath } from "next/cache";

// 🔧 purposefully cannot edit job location and job type
const Page = async ({ params }: { params: { id: string } }) => {
  async function create(formData: FormData) {
    "use server";

    // 🔧 form data sanitization
    const position = formData.get("position");
    const company = formData.get("company");


    const jobStatus = formData.get("jobStatus");
    const newFormData = new FormData();

    // Add the properties to the new FormData if they exist
    addPropertyToFormData(newFormData, "position", position);
    addPropertyToFormData(newFormData, "company", company);
    addPropertyToFormData(newFormData, "jobStatus", jobStatus);

    await handleFormPost(newFormData, `/jobs/${params.id}`, false, true, "PATCH");

    revalidatePath("/dashboard/stats");
    revalidatePath("/dashboard/all-jobs");
    redirect("/dashboard/all-jobs");
  }
  const job = await getJob(params.id);
  if (!job)
    return (
      <section className={styles.section}>
        <h2>No job for this id 🙁</h2>
        <Link className={`btn ${styles.editBtn}`} href={`/dashboard/all-jobs`}>
          Back to all-jobs
        </Link>
      </section>
    );
  const myJob = job?.data.data;
  return (
    <section className={styles.section}>
      <form
        method="patch"
        className={`form ${styles.form}`}
        // @ts-ignore
        action={create}
      >
        <h4 className={styles.formTitle}>edit job</h4>
        <div className={styles.formCenter}>
          <FormRow
            type="text"
            name="position"
            customCss={styles.formRow}
            defaultValue={myJob.position}
          />

          <FormRow
            type="text"
            name="company"
            customCss={styles.formRow}
            defaultValue={myJob.company}
          />
          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            defaultValue={myJob.jobLocation}
            customCss={styles.formRow}
            disabled
          />

          <FormRowSelect
            labelText="job status"
            name="jobStatus"
            defaultValue={myJob.jobStatus}
            list={Object.values(JobStatus)}
            customCss={styles.formRow}
          />
          <FormRowSelect
            labelText="job type"
            name="jobType"
            defaultValue={myJob.jobType}
            list={Object.values(JobType)}
            customCss={styles.formRow}
            disabled
          />
          <SubmitBtn
            formBtn={true}
            customBtn={styles.formBtn}
            pendingBtn={styles.pending}
            isLoading={false}
          />
          <Link
            className={`btn btn-block form-btn ${styles.formBtn}`}
            href={`/dashboard/all-jobs`}
          >
            Back to all-jobs
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Page;
