import {
  NextFunction,
  Request,
  Response,
} from "express";

import '../../../../shared/utils';

export function DeleteAccountMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { password } = request.body;

  if ((password as string).trim().isEmpty()) {
    return response.status(400).send({
      success: false,
      data: 'Campo Senha não foi preenchido',
    });
  };

  next();
};
