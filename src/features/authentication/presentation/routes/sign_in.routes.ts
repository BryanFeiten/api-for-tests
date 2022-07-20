import {
    Request,
    Response,
    Router,
} from 'express';
import { SignInUseCase } from '../../domain/usecases/sign_in.usecase';
import { AuthenticationRepository } from '../../infra/database/repositories/authentication.repository';

import { SignInController } from '../controllers/sign_in.controller';
import { SignInMiddleware } from '../middlewares/sign_in.middleware';

export class SignInRoutes {
    static getRoutes() {
        const router = Router();

        const repository = new AuthenticationRepository();
        const usecase = new SignInUseCase(repository);
        const controller = new SignInController(usecase);

        router.post('/signin', SignInMiddleware, (req: Request, res: Response) => controller.handle(req, res));

        return router;
    }
}
