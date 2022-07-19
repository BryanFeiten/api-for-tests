import {
  NextFunction,
  Request,
  Response,
} from "express";

import '../../../../shared/utils';

export function UpdateAccountMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const {
    firstName,
    lastName,
  } = request.body;

  if (firstName.trim().isEmpty() && lastName.trim().isEmpty()) {
    return response.status(400).send({
      success: false,
      data: 'É obrigatório o preenchimento do campo nome e/ou sobrenome',
    });
  }

  next();
};
