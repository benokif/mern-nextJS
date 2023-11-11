import { z } from "zod";
const JOBSTATUS = ["INTERVIEW", "DECLINED", "PENDING"];
const JOBTYPE = ["FULL_TIME", "PART_TIME", "INTERNSHIP"];
export const JobSchema = z.object({
    company: z.string(),
    position: z.string(),
    jobStatus: z.enum(JOBSTATUS).optional(),
    jobType: z.enum(JOBTYPE).optional(),
    jobLocation: z.string().optional(),
});
