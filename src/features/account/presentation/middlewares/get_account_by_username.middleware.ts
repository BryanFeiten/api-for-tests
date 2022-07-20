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
  const { username } = request.params;

  if (!username || username.trim().isEmpty()) {
    return response.status(400).json({
      success: false,
      data: 'Campo Nome de Usuário não foi preenchido',
    });
  };

  next();
};
