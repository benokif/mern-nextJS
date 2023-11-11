import FormRow from "@/components/FormRow";
import styles from "../page.module.css";
import { JobType, JobStatus } from "@/types/backendTypes";


import FormRowSelect from "@/components/FormRowSelect";
import SubmitBtn from "@/components/SubmitBtn";
import { SortOptions } from "@/types/stateTypes";
import JobContainer from "@/components/JobContainer";
import { cookies } from "next/headers";
import objectToQueryString from "@/utils/queryString";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getJobs } from "@/app/lib/data/externalAPIgetters";

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {

  const queryString = objectToQueryString(
    searchParams as Record<string, string>
  );
  const jobs = await getJobs(queryString);
  
  const handleSearch = async (formData: FormData) => {
    "use server";
    const formDataString = [...formData.entries()]
      .map(([name, value]) => `${name}=${value}`)
      .join("&");

    redirect(`/dashboard/all-jobs?${formDataString}`);
  };

  return (
    <>
      <section className={styles.section}>
        <form
          method="post"
          className={`form ${styles.form}`} // @ts-ignore
          action={handleSearch}
        >
          <h4 className={styles.formTitle}>search form</h4>
          <div className={styles.formCenter}>
            <FormRow type="search" name="search" customCss={styles.formRow} />
            <FormRowSelect
              labelText="job status"
              name="jobStatus"
              defaultValue={JobStatus.PENDING}
              list={["all", ...Object.values(JobStatus)]}
              customCss={styles.formRow}
            />
            <FormRowSelect
              labelText="job type"
              name="jobType"
              defaultValue={JobType.FULL_TIME}
              list={["all", ...Object.values(JobType)]}
              customCss={styles.formRow}
            />
            <FormRowSelect
              labelText="sort"
              name="sort"
              defaultValue={SortOptions.LATEST}
              list={[...Object.values(SortOptions)]}
              customCss={styles.formRow}
            />
            <SubmitBtn
              formBtn={true}
              customBtn={styles.formBtn}
              pendingBtn={styles.pending}
              isLoading={false}
            />
            <Link
              href="/dashboard/all-jobs"
              className={`btn btn-block form-btn ${styles.formBtn}`}
            >
              reset search values
            </Link>
          </div>
        </form>
      </section>
      <JobContainer
        jobs={jobs ? jobs.data.jobs : []}
        totalJobs={jobs ? jobs.data.totalJobs : 0}
        currentPage={jobs ? jobs.data.currentPage : 1}
        numOfPages={jobs ? jobs.data.numOfPages : 1}
        queryString={queryString || ""}
      />
    </>
  );
};

export default Page;
