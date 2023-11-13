import BadRequestError from "./bad-request.js";
import CustomAPIError from "./custom-api.js";
import NotFoundError from "./not-found.js";
import TooManyRequests from "./too-many-requests.js";
import UnauthenticatedError from "./unauthenticated.js";

export default { CustomAPIError, UnauthenticatedError, NotFoundError, BadRequestError, TooManyRequests };
