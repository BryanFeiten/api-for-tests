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
import { createAccountMiddleware } from '../middlewares/create_account.middleware';

export class AccountRoutes {
    static getRoutes() {
        const router = Router();

        router.post('/', createAccountMiddleware, (request: Request, response: Response) => {
            return new CreateAccountController().handle(request, response);
        });

        router.get('/:username', (request: Request, response: Response) => {
            return new GetAccountController().handle(request, response);
        });

        router.get('/', (request: Request, response: Response) => {
            return new AccountListController().handle(request, response);
        });

        router.delete('/:accountUid', (request: Request, response: Response) => {
            return new DeleteAccountController().handle(request, response);
        });

        router.put('/', (request: Request, response: Response) => {
            return new UpdateAccountController().handle(request, response);
        });

        return router;
    }
}
