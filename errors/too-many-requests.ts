import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './custom-api.js';

class TooManyRequests extends CustomAPIError {
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.TOO_MANY_REQUESTS;
  }
}

export default TooManyRequests;
