import { Request, Response, Router } from 'express';

import { UpdateUserController } from '../controllers/update_user.controller';
import { DeleteUserController } from '../controllers/delete_user.controller';
import { CreateUserController } from '../controllers/create_user.controller';
import { GetUserController } from '../controllers/get_user.controller';
import { ListUserController } from '../controllers/list_users.controller';
import { createUserMiddleware } from '../middlewares/create_user.middleware';

export class UserRoutes {
    static getRoutes() {
        const router = Router();

        router.post('/', createUserMiddleware, (request: Request, response: Response) => {
            return new CreateUserController().handle(request, response);
        });

        router.get('/:username', (request: Request, response: Response) => {
            return new GetUserController().handle(request, response);
        });

        router.get('/', (request: Request, response: Response) => {
            return new ListUserController().handle(request, response);
        });

        router.delete('/:userUid', (request: Request, response: Response) => {
            return new DeleteUserController().handle(request, response);
        });

        router.put('/', (request: Request, response: Response) => {
            return new UpdateUserController().handle(request, response);
        });

        return router;
    }
}
