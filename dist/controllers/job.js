import { nanoid } from "nanoid";
import CustomError from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import prisma from "../prisma.js";
import { validateMiddleware, verifyUserMatchesId, } from "../middleware/validation.js";
import { JobSchema } from "../models/job.model.js";
import { convertToSnakeCase, isValidJobStatus, } from "../utils/stringConversion.js";
let jobs = [
    { id: nanoid(), company: "apple", position: "front-end" },
    { id: nanoid(), company: "google", position: "manager" },
];
const getJobs = async (req, res) => {
    if (!req.user)
        throw new CustomError.UnauthenticatedError("authentication invalid");
    const jobs = await prisma.job.findMany({
        where: { authorId: req.user.userId },
    });
    res.status(StatusCodes.OK).json({ success: true, data: jobs });
};
const createJob = async (req, res, next) => {
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
                jobStatus: isValidJobStatus(convertedJobStatus) ? convertedJobStatus : undefined,
            },
        });
        res.status(StatusCodes.CREATED).json({ success: true, data: newJob });
    }
    catch (error) {
        next(error);
    }
};
const getSingleJob = async (req, res) => {
    if (!req.user)
        throw new CustomError.UnauthenticatedError("authentication invalid");
    const { id } = req.params;
    const job = await prisma.job.findUnique({
        where: {
            id: id,
        },
    });
    if (!job)
        throw new CustomError.NotFoundError(`no job found for id ${id}`);
    // AUTH USER VALIDATION
    verifyUserMatchesId(req, job);
    res.status(StatusCodes.OK).json({ success: true, data: job });
};
const updateJob = async (req, res, next) => {
    const { id } = req.params;
    const job = await prisma.job.findUnique({
        where: {
            id: id,
        },
    });
    if (!job)
        throw new CustomError.NotFoundError(`no job found for id ${id}`);
    // AUTH USER VALIDATION
    verifyUserMatchesId(req, job);
    const { company, position, jobStatus } = req.body;
    let convertJobStatus;
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
        }
        else {
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
    }
    catch (e) {
        next(e);
    }
};
const deleteJob = async (req, res, next) => {
    const { id } = req.params;
    try {
        await prisma.job.delete({
            where: { id: id },
        });
        res.status(StatusCodes.OK).json({ success: true, msg: "job deleted" });
    }
    catch (e) {
        next(e);
    }
};
export { getJobs, createJob, updateJob, deleteJob, getSingleJob };
