import jwt from 'jsonwebtoken';

export class JwtAdapter {
  readonly #secret: string;

  constructor(secret: string) {
    this.#secret = secret;
  }

  async encrypt(data: any): Promise<string> {
    return jwt.sign(data, this.#secret);
  }

  async decrypt(cipherText: string): Promise<any> {
    return jwt.verify(cipherText, this.#secret);
  }
}