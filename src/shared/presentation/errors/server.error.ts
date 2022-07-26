import { CustomError } from "./custom.error";

export class ServerError extends CustomError {
  name: string;
  code: number;

  constructor(message: string) {
    const code = 500;
    super(message, code);
    this.name = 'ServerError';
    this.code = code;
  }
}