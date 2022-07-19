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

  if ((username as string).trim().isEmpty()) {
    return response.status(400).send({
      success: false,
      data: 'Campo Nome de Usuário não foi preenchido',
    });
  };

  if ((firstName as string).trim().isEmpty()) {
    return response.status(400).send({
      success: false,
      data: 'Campo Nome não foi preenchido',
    });
  };

  if ((lastName as string).trim().isEmpty()) {
    return response.status(400).send({
      success: false,
      data: 'Campo Sobrenome não foi preenchido',
    });
  };

  if ((email as string).trim().isEmpty()) {
    return response.status(400).send({
      success: false,
      data: 'Campo E-mail não foi preenchido',
    });
  };

  if ((password as string).trim().isEmpty()) {
    return response.status(400).send({
      success: false,
      data: 'Campo Senha não foi preenchido',
    });
  };

  next();
};
