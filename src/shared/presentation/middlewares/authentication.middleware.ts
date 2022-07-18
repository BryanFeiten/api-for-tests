import {
  NextFunction,
  Request,
  Response,
} from "express";
import 'dotenv/config';

import '../../utils';
import { JwtAdapter } from "../../adapters/jwt.adapter";

export async function AuthMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const bearerToken = request.headers.authorization;

  if (!bearerToken) {
    return response.status(401).send({
      success: false,
      data: 'Usuário não autenticado',
    });
  }

  const [, token] = bearerToken.split(" ");

  if (!token) {
    return response.status(401).send({
      success: false,
      data: 'Usuário não autenticado',
    });
  }

  const jwt = new JwtAdapter(process.env.JWT_SECRET as string);

  try {
    const authUser = await jwt.decrypt(token);

    request.body.authUser = authUser;
    next();
  } catch (error) {
    return response.status(401).send({
      success: false,
      data: 'Usuário não autenticado',
      // data: 'Token inválido',
    });
  }
};
