import { Job } from '@/types/backendTypes'
import React from 'react'
import JobComponent from './Job'
import styles from './job-container.module.css'
import PageBtnContainer from './PageBtnContainer';

const JobContainer = ({
  jobs,
  totalJobs,
  currentPage,
  numOfPages,
  queryString
}: {
  jobs: Job[];
  totalJobs: number;
  currentPage: number;
  numOfPages: number;
  queryString: string;
}) => {
  if (!jobs.length)
    return (
      <section className={`section ${styles.section}`}>
        <h2 className={styles.jobsErrorTitle}>no jobs to display!</h2>
      </section>
    );
  return (
    <section className={`section ${styles.section}`}>
      <h5 className={styles.jobsTitle}>
        {totalJobs.toString()} job{jobs.length > 1 ? "s" : ""} found
      </h5>
      <div className={styles.jobs}>
        {jobs.map((job) => {
          return <JobComponent key={job.id} job={job} />;
        })}
      </div>
      {numOfPages > 1 && (
        <PageBtnContainer
          jobs={jobs}
          totalJobs={totalJobs}
          currentPage={currentPage}
          numOfPages={numOfPages}
          queryString={queryString}
        />
      )}
    </section>
  );
};

export default JobContainer