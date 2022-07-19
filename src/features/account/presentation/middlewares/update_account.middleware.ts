import {
  NextFunction,
  Request,
  Response,
} from "express";

import '../../../../shared/utils/extension_methods';

export function UpdateAccountMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const {
    firstName,
    lastName,
  } = request.body;

  if (!firstName && !lastName) {
    return response.status(400).json({
      success: false,
      data: 'É obrigatório o preenchimento do campo nome e/ou sobrenome',
    });
  }

  if (firstName && firstName.trim().isNotEmpty()) next();

  if (lastName && lastName.trim.isNotEmpty()) next();

  return response.status(400).json({
    success: false,
    data: 'É obrigatório o preenchimento do campo nome e/ou sobrenome',
  });
};
