import {
    Request,
    Response,
    Router,
} from 'express';

import {
    AccountListController,
    CreateAccountController,
    DeleteAccountController,
    GetAccountController,
    UpdateAccountController,
} from '../controllers';

import {
    CreateAccountMiddleware,
    DeleteAccountMiddleware,
    GetAccountByUsernameMiddleware,
    UpdateAccountMiddleware,
} from '../middlewares';

import { AuthMiddleware } from '../../../../shared/presentation/middlewares/authentication.middleware';

export class AccountRoutes {
    static getRoutes() {
        const router = Router();

        router.post('/', CreateAccountMiddleware, (request: Request, response: Response) => {
            return new CreateAccountController().handle(request, response);
        });

        router.get('/:username', [AuthMiddleware, GetAccountByUsernameMiddleware], (request: Request, response: Response) => {
            return new GetAccountController().handle(request, response);
        });

        router.get('/', AuthMiddleware, (request: Request, response: Response) => {
            return new AccountListController().handle(request, response);
        });

        router.delete('/', [AuthMiddleware, DeleteAccountMiddleware], (request: Request, response: Response) => {
            return new DeleteAccountController().handle(request, response);
        });

        router.put('/', [AuthMiddleware, UpdateAccountMiddleware], (request: Request, response: Response) => {
            return new UpdateAccountController().handle(request, response);
        });

        return router;
    }
}
