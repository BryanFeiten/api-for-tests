import {
  NextFunction,
  Request,
  Response,
} from "express";

import '../../../../shared/utils';

export function DeletePostMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {

  const { password } = request.body;

  if (!password || password.trim().isEmpty()) {
    return response.status(400).json({
      success: false,
      data: 'Campo Senha não foi preenchido',
    });
  }
  
  next();
}