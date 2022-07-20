import { CustomError } from "./custom.error";

export class UnauthorizedError extends CustomError {
  name: string;
  code: number;

  constructor(message: string) {
    const code = 401;
    super(message, code);
    this.name = 'NotFoundError';
    this.code = code;
  }
}