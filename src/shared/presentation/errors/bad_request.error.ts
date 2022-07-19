import { CustomError } from './custom.error';

export class BadRequestError extends CustomError {
  constructor(message: string) {
    super(message);
    this.code = 400;
    this.name = 'BadRequestError';
  }
}