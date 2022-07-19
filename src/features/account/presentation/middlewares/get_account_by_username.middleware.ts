import {
  NextFunction,
  Request,
  Response,
} from "express";

import '../../../../shared/utils';

export function GetAccountByUsernameMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { username } = request.body;

  if ((username as string).trim().isEmpty()) {
    return response.status(400).send({
      success: false,
      data: 'Campo Nome de Usuário não foi preenchido',
    });
  };

  next();
};
