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

  if (!title || title.trim().isEmpty()) {
    return response.status(400).json({
      success: false,
      data: 'Campo Título não foi preenchido',
    });
  }

  if (!description || description.trim().isEmpty()) {
    return response.status(400).json({
      success: false,
      data: 'Campo Descrição não foi preenchido',
    });
  }

  next();
}