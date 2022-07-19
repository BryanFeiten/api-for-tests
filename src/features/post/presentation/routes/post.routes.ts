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

export class PostRoutes {
    static getRoutes() {
        const router = Router();

        router.post('/', [AuthMiddleware, CreatePostMiddleware], (request: Request, response: Response) => {
            return new CreatePostController().handle(request, response);
        });

        router.get('/:uid', [AuthMiddleware], (request: Request, response: Response) => {
            return new GetPostByUidController().handle(request, response);
        });

        router.get('/user/:uid', [AuthMiddleware], (request: Request, response: Response) => {
            return new GetPostListByAccountController().handle(request, response);
        });

        router.get('/', [AuthMiddleware], (request: Request, response: Response) => {
            return new GetPostListController().handle(request, response);
        });

        router.delete('/:uid', [AuthMiddleware, DeletePostMiddleware], (request: Request, response: Response) => {
            return new DeletePostController().handle(request, response);
        });

        router.put('/:uid', [AuthMiddleware, UpdatePostMiddleware], (request: Request, response: Response) => {
            return new UpdatePostController().handle(request, response);
        });

        return router;
    }
}
