import { CustomError } from './custom.error';

export class BadRequestError extends CustomError {
  name: string;
  code: number;

  constructor(message: string) {
    const code = 400;
    super(message, code);
    this.name = 'NotFoundError';
    this.code = code;
  }

}