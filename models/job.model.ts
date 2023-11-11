import { z } from "zod";

const JOBSTATUS = ["INTERVIEW", "DECLINED", "PENDING"] as const;

const JOBTYPE = ["FULL_TIME", "PART_TIME", "INTERNSHIP"] as const;

export const JobSchema = z.object({
  company: z.string(),
  position: z.string(),
  jobStatus: z.enum(JOBSTATUS).optional(),
  jobType: z.enum(JOBTYPE).optional(),
  jobLocation: z.string().optional(),
});

// for sorting in job controller
// must match 1-1
export enum SortOptions {
  LATEST = "LATEST",
  OLDEST = "OLDEST",
  A_Z = "A-Z",
  Z_A = "Z-A",
}
