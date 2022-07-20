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
import { AccountRepository } from '../../infra/database/repositories/account.repository';
import { CreateAccountUseCase, DeleteAccountUseCase, GetAccountListUseCase, GetAccountUseCase, UpdateAccountUseCase } from '../../domain/usecases';
import { CacheRepository } from '../../../../core/infra/database/repositories/cache.repository';

export class AccountRoutes {
    static getRoutes() {
        const router = Router();

        const accountRepository = new AccountRepository();
        const cacheRepository = new CacheRepository();

        const createAccountUseCase = new CreateAccountUseCase(accountRepository, cacheRepository);
        const deleteAccountUseCase = new DeleteAccountUseCase(accountRepository, cacheRepository);
        const getAccountUseCase = new GetAccountUseCase(accountRepository, cacheRepository);
        const getAccountListUseCase = new GetAccountListUseCase(accountRepository, cacheRepository);
        const updateAccountUseCase = new UpdateAccountUseCase(accountRepository, cacheRepository);

        const createAccountController = new CreateAccountController(createAccountUseCase);
        const deleteAccountController = new DeleteAccountController(deleteAccountUseCase);
        const getAccountController = new GetAccountController(getAccountUseCase);
        const getAccountListController = new AccountListController(getAccountListUseCase);
        const updateAccountController = new UpdateAccountController(updateAccountUseCase);

        router.post(
            '/',
            CreateAccountMiddleware,
            (req: Request, res: Response) => createAccountController.handle(req, res),
        );

        router.get(
            '/:username',
            [AuthMiddleware, GetAccountByUsernameMiddleware],
            (req: Request, res: Response) => getAccountController.handle(req, res),
        );

        router.get(
            '/',
            AuthMiddleware,
            (req: Request, res: Response) => getAccountListController.handle(req, res),
        );

        router.delete(
            '/',
            [AuthMiddleware, DeleteAccountMiddleware],
            (req: Request, res: Response) => deleteAccountController.handle(req, res),
        );

        router.put(
            '/',
            [AuthMiddleware, UpdateAccountMiddleware],
            (req: Request, res: Response) => updateAccountController.handle(req, res),
        );

        return router;
    }
}
