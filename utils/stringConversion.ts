import { JobStatus } from "@prisma/client";

export const convertToSnakeCase = (inputString: string): string => {
  // Replace hyphens and underscores with spaces, and split the string into words
  const words = inputString.replace(/[-_]/g, " ").split(" ");

  // Convert each word to uppercase and join them with underscores
  const snakeCaseString = words.map((word) => word.toUpperCase()).join("_");

  return snakeCaseString;
};

// ⛏ copy values from JobStatus
const validJobStatuses: string[] = ["INTERVIEW" , "DECLINED" , "PENDING"];
export const isValidJobStatus=(status: string): status is JobStatus => {
  return validJobStatuses.includes(status as JobStatus);
}