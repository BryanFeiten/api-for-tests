import {
    Request,
    Response,
    Router,
} from 'express';

import { AuthMiddleware } from '../../../../shared/presentation/middlewares/authentication.middleware';

import {
    CreatePostMiddleware,
    DeletePostMiddleware,
    UpdatePostMiddleware,
} from '../middlewares';
import {
    CreatePostController,
    DeletePostController,
    GetPostByUidController,
    GetPostListController,
    GetPostListByAccountController,
    UpdatePostController
} from '../controllers';
import { PostRepository } from '../../infra/database/repositories/post.repository';
import { AccountRepository } from '../../../account/infra/database/repositories/account.repository';
import { CacheRepository } from '../../../../core/infra/database/repositories/cache.repository';
import { CreatePostUseCase, DeletePostUseCase, GetPostByUidUseCase, GetPostListByAccountUseCase, GetPostListUseCase, UpdatePostUseCase } from '../../domain/usecases';

export class PostRoutes {
    static getRoutes() {
        const router = Router();

        const repository = new PostRepository();
        const accountRepository = new AccountRepository();
        const cacheRepository = new CacheRepository();

        const createPostUseCase = new CreatePostUseCase(repository, cacheRepository);
        const deletePostUseCase = new DeletePostUseCase(repository, cacheRepository);
        const getPostByUidUseCase = new GetPostByUidUseCase(repository, cacheRepository);
        const getPostListUseCase = new GetPostListUseCase(repository, cacheRepository);
        const getPostListByAccountUseCase = new GetPostListByAccountUseCase(repository, cacheRepository, accountRepository);
        const updatePostUseCase = new UpdatePostUseCase(repository, cacheRepository);

        const createPostController = new CreatePostController(createPostUseCase);
        const deletePostController = new DeletePostController(deletePostUseCase);
        const getPostByUidController = new GetPostByUidController(getPostByUidUseCase);
        const getPostListController = new GetPostListController(getPostListUseCase);
        const getPostListByAccountController = new GetPostListByAccountController(getPostListByAccountUseCase);
        const updatePostController = new UpdatePostController(updatePostUseCase);

        router.post(
            '/',
            [AuthMiddleware, CreatePostMiddleware],
            (req: Request, res: Response) => createPostController.handle(req, res),
        );

        router.get(
            '/:uid',
            [AuthMiddleware],
            (req: Request, res: Response) => deletePostController.handle(req, res),
        );

        router.get(
            '/user/:uid',
            [AuthMiddleware],
            (req: Request, res: Response) => getPostByUidController.handle(req, res),
        );

        router.get(
            '/',
            [AuthMiddleware],
            (req: Request, res: Response) => getPostListController.handle(req, res),
        );

        router.delete(
            '/:uid',
            [AuthMiddleware, DeletePostMiddleware],
            (req: Request, res: Response) => getPostListByAccountController.handle(req, res),
        );

        router.put(
            '/:uid',
            [AuthMiddleware, UpdatePostMiddleware],
            (req: Request, res: Response) => updatePostController.handle(req, res),
        );

        return router;
    }
}
