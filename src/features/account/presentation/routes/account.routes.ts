import {
    Request,
    Response,
    Router,
} from 'express';

import { UpdateAccountController } from '../controllers/update_account.controller';
import { DeleteAccountController } from '../controllers/delete_account.controller';
import { CreateAccountController } from '../controllers/create_account.controller';
import { GetAccountController } from '../controllers/get_account.controller';
import { AccountListController } from '../controllers/account_list.controller';
import { CreateAccountMiddleware } from '../middlewares/create_account.middleware';
import { UpdateAccountMiddleware } from '../middlewares/update_account.middleware';
import { DeleteAccountMiddleware } from '../middlewares/delete_account.middleware';
import { GetAccountByUsernameMiddleware } from '../middlewares/get_account_by_username.middleware';
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
