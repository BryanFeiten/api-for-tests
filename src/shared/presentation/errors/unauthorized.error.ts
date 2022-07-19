import { CustomError } from "./custom.error";

export class UnauthorizedError extends CustomError {
  constructor(message: string) {
    super(message);
    this.name = 'UnauthorizedError';
    this.code = 401;
  }
}