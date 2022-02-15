import { CustomAPIError } from "./custom-api.js";
import { StatusCodes } from "http-status-codes";

export class MethodFailureError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.StatusCode = StatusCodes.METHOD_FAILURE;
  }
}
