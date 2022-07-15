import {
    Request,
    Response,
    Router,
} from 'express';

import { CreatePostController } from '../controllers/create_post.controller';
import { DeletePostController } from '../controllers/delete_post.controller';
import { GetPostByUidController } from '../controllers/get_post_by_uid.controller';
import { GetPostListController } from '../controllers/get_post_list.controller';
import { GetPostListByAccountController } from '../controllers/get_post_list_by_account.controller';
import { UpdatePostController } from '../controllers/update_post.controller';

export class PostRoutes {
    static getRoutes() {
        const router = Router();

        router.post('/', (request: Request, response: Response) => {
            return new CreatePostController().handle(request, response);
        });

        router.get('/:uid', (request: Request, response: Response) => {
            return new GetPostByUidController().handle(request, response);
        });

        router.get('/user/:uid', (request: Request, response: Response) => {
            return new GetPostListByAccountController().handle(request, response);
        });

        router.get('/', (request: Request, response: Response) => {
            return new GetPostListController().handle(request, response);
        });

        router.delete('/:uid', (request: Request, response: Response) => {
            return new DeletePostController().handle(request, response);
        });

        router.put('/:uid', (request: Request, response: Response) => {
            return new UpdatePostController().handle(request, response);
        });

        return router;
    }
}
