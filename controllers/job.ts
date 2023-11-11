import { nanoid } from "nanoid";
import { NextFunction, Response } from "express";
import { CustomRequest } from "../types/custom";
import CustomError from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import prisma from "../prisma.js";
import {
  validateMiddleware,
  verifyUserMatchesId,
} from "../middleware/validation.js";
import { JobSchema, SortOptions } from "../models/job.model.js";
import {
  convertToSnakeCase,
  isValidJobStatus,
} from "../utils/stringConversion.js";
import { JobStatus } from "@prisma/client";
import groupObjectsByMonth from "../utils/dateConversion.js";

let jobs = [
  { id: nanoid(), company: "apple", position: "front-end" },
  { id: nanoid(), company: "google", position: "manager" },
];
const getJobs = async (req: CustomRequest, res: Response) => {
  if (!req.user)
    throw new CustomError.UnauthenticatedError("authentication invalid");
  // 🔧 search parameters

  const { search, jobStatus, jobType, sort } = req.query;

  const queryObject = {
    AND: [] as any, // Initialize the array for complex conditions
  };

  if (search) {
    queryObject.AND.push({
      OR: [
        { position: { contains: search, mode: "insensitive" } },
        { company: { contains: search, mode: "insensitive" } },
      ],
    });
  }

  if (jobStatus && jobStatus !== "all") {
    queryObject.AND.push({ jobStatus });
  }
  if (jobType && jobType !== "all") {
    queryObject.AND.push({ jobType });
  }

  // key: value of SortOptions enum
  // value: job property that we are ordering by
  //    createdAt for time sorting
  //    position for alphabetical sorting
  const sortOptions: Record<string, string> = {
    LATEST: "createdAt",
    OLDEST: "createdAt",
    A_Z: "position",
    Z_A: "position",
  };
  const sortKey = sortOptions[sort as string] || sortOptions.LATEST;
  
  // Setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const totalJobs = await prisma.job.count(
    {
    where: {
      AND: [
        { authorId: req.user.userId },
        ...queryObject.AND, // Combine the search parameters
      ],
    },
  });
  const jobs = await prisma.job.findMany({
    where: {
      AND: [
        { authorId: req.user.userId },
        ...queryObject.AND, // Combine the search parameters
      ],
    },
    orderBy: {
      [sortKey]: (sort === "OLDEST" || sort === "A_Z") ? "asc" : "desc", // You can change 'asc' to 'desc' if necessary
    },
    skip,
    take: limit,
  });

  // ❗️ use 'count' here
   const numOfPages = Math.ceil(totalJobs / limit);

  res
    .status(StatusCodes.OK)
    .json({ totalJobs, numOfPages, currentPage: page, jobs });
};
const createJob = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user)
    throw new CustomError.UnauthenticatedError("authentication invalid");
  const { company, position, jobStatus, jobType } = req.body;
  const author = {
    connect: { id: req.user.userId },
  };
  const convertedJobStatus = convertToSnakeCase(jobStatus);
  const convertedJobType = convertToSnakeCase(jobType);
  const content = { company, position, convertedJobStatus, convertedJobType };

  // SCHEMA VALIDATION
  validateMiddleware(JobSchema, content, res);
  // if (!company || !position)
  //   throw new CustomError.BadRequestError(
  //     "Company and Position need to be filled"
  //   );

  try {
    const newJob = await prisma.job.create({
      data: {
        company,
        position,
        author,
        jobStatus: isValidJobStatus(convertedJobStatus)
          ? convertedJobStatus
          : undefined,
      },
    });
  
    res.status(StatusCodes.CREATED).json({ success: true, data: 'newJob' });
  } catch (error) {
    next(error);
  }
};
const getSingleJob = async (req: CustomRequest, res: Response) => {
  if (!req.user)
    throw new CustomError.UnauthenticatedError("authentication invalid");
  const { id } = req.params;
  const job = await prisma.job.findUnique({
    where: {
      id: id,
    },
  });
  if (!job) throw new CustomError.NotFoundError(`no job found for id ${id}`);

  // AUTH USER VALIDATION
  verifyUserMatchesId(req, job);

  res.status(StatusCodes.OK).json({ success: true, data: job });
};
const updateJob = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const job = await prisma.job.findUnique({
    where: {
      id: id,
    },
  });
  if (!job) throw new CustomError.NotFoundError(`no job found for id ${id}`);
  // AUTH USER VALIDATION
  verifyUserMatchesId(req, job);

  const { company, position, jobStatus } = req.body;
  let convertJobStatus: JobStatus;

  try {
    let updatedJob;
    if (isValidJobStatus(jobStatus)) {
      convertJobStatus = jobStatus;
      updatedJob = await prisma.job.update({
        where: { id: id },
        data: {
          // ❗️ this does not enforce checks of empty strings
          company: company !== null ? company : undefined,
          position: position !== null ? position : undefined,
          jobStatus: convertJobStatus,
        },
      });
    } else {
      updatedJob = await prisma.job.update({
        where: { id: id },
        data: {
          // ❗️ this does not enforce checks of empty strings
          company: company !== null ? company : undefined,
          position: position !== null ? position : undefined,
        },
      });
    }
    res.status(StatusCodes.OK).json({ success: true, data: updatedJob });
  } catch (e) {
    next(e);
  }
};
const deleteJob = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    await prisma.job.delete({
      where: { id: id },
    });

    res.status(StatusCodes.OK).json({ success: true, msg: "job deleted" });
  } catch (e) {
    next(e);
  }
};

const getStats = async (req: CustomRequest, res: Response) => {
  const defaultStatsdef = {
    PENDING: 22,
    DECLINED: 11,
    INTERVIEW: 1,
  };
  let monthlyApplicationsdef = [
    {
      date: "May 2023",
      count: 8,
    },
    {
      date: "June 2023",
      count: 4,
    },
    {
      date: "July 2023",
      count: 13,
    },
  ];
  if (!req.user)
    throw new CustomError.UnauthenticatedError("authentication invalid");
  const jobs = await prisma.job.findMany({
    where: { authorId: req.user.userId },
  });

  const stats = await prisma.job.groupBy({
    by: ["jobStatus"],
    where: {
      authorId: req.user.userId,
    },
    _count: true,
  });

  interface JobStatusStats {
    [key: string]: number;
  }

  const jobStatusStats = stats.reduce((acc, curr) => {
    const { jobStatus, _count } = curr;
    acc[jobStatus as string] = _count;
    return acc;
  }, {} as JobStatusStats);

  const defaultStats = {
    pending: jobStatusStats["PENDING"] || 0,
    interview: jobStatusStats["INTERVIEW"] || 0,
    declined: jobStatusStats["DECLINED"] || 0,
  };

  // Monthly Applications Stats
  const monthlyApplications = await prisma.job.groupBy({
    by: ["createdAt"],
    where: {
      authorId: req.user.userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // impossible to aggregate by month or year in Prisma
  // unefficient server function that orders all jobs of a user by month
  //@ts-ignore
  const monthlyApplicationStats = groupObjectsByMonth(monthlyApplications);

  const stat = monthlyApplicationStats.reduce(
    (acc, cur) => {
      return cur.count > acc.count ? cur : acc;
    },
    monthlyApplicationStats[0]
  );

  
  res
    .status(StatusCodes.OK)
    .json({ jobStatusStats: defaultStats, monthlyApplicationStats, maxCount: stat.count });
};

export { getJobs, createJob, updateJob, deleteJob, getSingleJob, getStats };
