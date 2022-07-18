import {
    Request,
    Response,
    Router,
} from 'express';

import { SignInController } from '../controllers/sign_in.controller';
import { SignInMiddleware } from '../middlewares/sign_in.middleware';

export class SignInRoutes {
    static getRoutes() {
        const router = Router();

        router.post('/signin', SignInMiddleware, (request: Request, response: Response) => {
            return new SignInController().handle(request, response);
        });

        return router;
    }
}
