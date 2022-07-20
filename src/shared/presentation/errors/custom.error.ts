import supertest from "supertest";

export abstract class CustomError extends Error {
  constructor(name: string, public code: number) {
    super(name);
  }
}