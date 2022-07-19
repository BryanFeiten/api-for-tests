import {
  NextFunction,
  Request,
  Response,
} from "express";

import '../../../../shared/utils';

export function CreatePostMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {

  const { title, description } = request.body;

  if (title.trim().isEmpty()) {
    return response.status(400).send({
      success: false,
      data: 'Campo Título não foi preenchido',
    });
  }

  if (description.trim().isEmpty()) {
    return response.status(400).send({
      success: false,
      data: 'Campo Descrição não foi preenchido',
    });
  }

  next();
}