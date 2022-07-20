import { CustomError } from "./custom.error";

export class NotFoundError extends CustomError {
  name: string;
  code: number;

  constructor(message: string) {
    const code = 404;
    super(message, code);
    this.name = 'NotFoundError';
    this.code = code;
  }
}