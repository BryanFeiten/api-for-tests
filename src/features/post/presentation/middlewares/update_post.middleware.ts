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

  if (!title && !description) {
    return response.status(400).json({
      success: false,
      data: 'É obrigatório o preenchimento do campo Título e/ou Descrição',
    });
  }

  if (title && title.trim().isNotEmpty()) next();

  if (description && description.trim().isNotEmpty()) next();

  return response.status(400).json({
    success: false,
    data: 'É obrigatório o preenchimento do campo Título e/ou Descrição',
  });
}