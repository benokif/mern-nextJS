export const convertToSnakeCase = (inputString) => {
    // Replace hyphens and underscores with spaces, and split the string into words
    const words = inputString.replace(/[-_]/g, " ").split(" ");
    // Convert each word to uppercase and join them with underscores
    const snakeCaseString = words.map((word) => word.toUpperCase()).join("_");
    return snakeCaseString;
};
// ⛏ copy values from JobStatus
const validJobStatuses = ["INTERVIEW", "DECLINED", "PENDING"];
export const isValidJobStatus = (status) => {
    return validJobStatuses.includes(status);
};
