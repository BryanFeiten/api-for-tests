import {
  NextFunction,
  Request,
  Response,
} from "express";

import '../../../../shared/utils';

export function CreateAccountMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const {
    username,
    firstName,
    lastName,
    email,
    password,
  } = request.body;

  if (!username || username.trim().isEmpty()) {
    return response.status(400).send({
      success: false,
      data: 'Campo Nome de Usuário não foi preenchido',
    });
  };

  if (!firstName || firstName.trim().isEmpty()) {
    return response.status(400).send({
      success: false,
      data: 'Campo Nome não foi preenchido',
    });
  };

  if (!firstName || lastName.trim().isEmpty()) {
    return response.status(400).send({
      success: false,
      data: 'Campo Sobrenome não foi preenchido',
    });
  };

  if (!email || email.trim().isEmpty()) {
    return response.status(400).send({
      success: false,
      data: 'Campo E-mail não foi preenchido',
    });
  };

  if (!password || password.trim().isEmpty()) {
    return response.status(400).send({
      success: false,
      data: 'Campo Senha não foi preenchido',
    });
  };

  next();
};
