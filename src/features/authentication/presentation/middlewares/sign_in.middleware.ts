import {
  NextFunction,
  Request,
  Response,
} from "express";

import '../../../../shared/utils';

export function SignInMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { email, password } = request.body;

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
