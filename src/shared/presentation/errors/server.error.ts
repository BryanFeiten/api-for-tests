import { CustomError } from "./custom.error";

export class ServerError extends CustomError {
  constructor(message: string) {
    super(message);
    this.name = 'ServerError';
    this.code = 500;
  }
}