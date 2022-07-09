import { NextFunction, Request, Response } from "express";

export const createUserMiddleware = (request: Request, response: Response, next: NextFunction) => {
  const {
    username,
    firstName,
    lastName,
    email,
    password,
  } = request.body;

  if ((username as string).isNotEmpty()) {
    throw new Error('Campo Nome de Usuário não foi preenchido');
  };

  if ((firstName as string).isNotEmpty()) {
    throw new Error('Campo Nome não foi preenchido');
  };

  if ((lastName as string).isNotEmpty()) {
    throw new Error('Campo Sobrenome não foi preenchido');
  };

  if ((email as string).isNotEmpty()) {
    throw new Error('Campo E-mail não foi preenchido');
  };

  if ((password as string).isNotEmpty()) {
    throw new Error('Campo Senha não foi preenchido');
  };

  next();
};