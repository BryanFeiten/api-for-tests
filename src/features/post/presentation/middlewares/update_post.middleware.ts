import {
  NextFunction,
  Request,
  Response,
} from "express";

import '../../../../shared/utils';

export function UpdatePostMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {

  const { title, description } = request.body;

  if (title.trim().isEmpty() && description.trim().isEmpty()) {
    return response.status(400).send({
      success: false,
      data: 'É obrigatório o preenchimento do campo Título e/ou Descrição',
    });
  }
  
  next();
}