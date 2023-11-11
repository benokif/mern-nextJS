import { StatusCodes } from "http-status-codes";
import { Prisma } from "@prisma/client";
const errorHandlerMiddleware = (err, req, res, next) => {
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "Something went wrong, try again later",
    };
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        console.log("💩the Error code is:", err);
        // P2025: does not exist -> handled in controller
        // P2023: malformed id: expected a 12 bytes string.
        if (err.code === "P2023") {
            customError.msg = `malformed id: expected a 12 bytes string. Please ensure you submitted the correct id`;
            customError.statusCode = 400;
        }
        // P2002
        if (err.code === "P2002") {
            if ((err?.meta?.target) && (typeof err?.meta?.target === 'string')) {
                const field = err.meta.target.split('_')[1];
                customError.msg = `Error: someone is already using that ${field}`;
            }
            customError.statusCode = 400;
        }
    }
    if (err instanceof Prisma.PrismaClientValidationError) {
        // 🔧 Invalid value for argument: MOST LIKELY mismatch schema Prisma DB/ backend type mismatch front-end/backend
        // run 
        // The .code property can be accessed in a type-safe manner
        console.log("👹the Validation err code is:", err);
        customError.msg = `Invalid argument - please let the dev team know`; // P2025: does not exist
        customError.statusCode = 500;
        // P2023: malformed id
    }
    // db agnostic: check res.json({err}), then use err properties to construct different errors
    // VALIDATION ERROR
    //
    if (err.name === "ValidationError") {
        customError.msg =
            "Please provide missing fields";
        // + Object.values(err.errors)
        //   .map((item) => item.path)
        //   .join(",");
        customError.statusCode = 400;
    }
    // DUPLICATE ERROR
    if (err.code === 11000) {
        customError.msg = `Duplicate value entered for `;
        // ${Object.keys(
        //   err.keyValue
        // )}`;
        customError.statusCode = 400;
    }
    // CAST ERROR
    if (err.name === "CastError") {
        customError.msg = `No item found for id: ${err.value || 'unknown id'}`;
        customError.statusCode = 404;
    }
    return res.status(Number(customError.statusCode)).json({ msg: customError.msg });
};
export default errorHandlerMiddleware;
