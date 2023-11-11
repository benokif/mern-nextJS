import React from "react";
import {
  BriefcaseIcon,
  BuildingOfficeIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { Job } from "@/types/backendTypes";

import styles from "./job-container.module.css";
import JobInfo from "./JobInfo";
import Link from "next/link";
import {
  handleFormDelete,
} from "@/app/lib/actions/externalAPIactions";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

day.extend(advancedFormat);
const Job = ({ job }: { job: Job }) => {
  async function create(formData: FormData) {
    "use server";
    await handleFormDelete(`/jobs/${job.id}`, true);
    revalidatePath("/dashboard/stats");
    revalidatePath("/dashboard/admin");
    revalidatePath("/dashboard/all-jobs");
    redirect("/dashboard/all-jobs");

  }

  const date = day(job.createdAt).format("MMM Do, YYYY");
  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <div className={styles.mainIcon}>{job.company[0]}</div>
        <div className={styles.info}>
          <h5 className={styles.infoTitle}>{job.position}</h5>
          <p>{job.company}</p>
        </div>
      </header>
      <div className={styles.content}>
        <div className={styles.contentCenter}>
          <JobInfo icon={<BuildingOfficeIcon />} text={job.jobLocation} />
          <JobInfo icon={<CalendarDaysIcon />} text={date} />
          <JobInfo
            icon={<BriefcaseIcon />}
            text={job.jobType.toLowerCase().replace("_", "-")}
          />
          <div
            className={`${styles.status} ${job.jobStatus
              .toLowerCase()
              .replace("_", "-")}`}
          >
            {job.jobStatus.toLowerCase().replace("_", "-")}
          </div>
        </div>
        <footer className={styles.actions}>
          <Link
            className={`btn ${styles.editBtn}`}
            href={`/dashboard/${job.id}`}
          >
            Edit
          </Link>
          <form
            method="DELETE"
            // @ts-ignore
            action={create}
          >
            <button type="submit" className={`btn ${styles.deleteBtn}`}>
              Delete
            </button>
          </form>
        </footer>
      </div>
    </article>
  );
};

export default Job;
