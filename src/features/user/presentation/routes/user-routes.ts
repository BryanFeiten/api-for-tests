import { UpdateUserController } from "./../controllers/update-user-controller";
import { DeleteUserController } from "./../controllers/delete-user-controller";
import { CreateUserController } from "./../controllers/create-user-controller";
import { Request, response, Response, Router } from "express";
import { GetUserController } from "../controllers/get-user-controller";
import { ListUserController } from "../controllers/list-users-controller";

export class UserRoutes {
    static getRoutes() {
        const router = Router();

        router.post("/", (req: Request, res: Response) => {
            return new CreateUserController().handle(req, res);
        });

        router.get("/:username", (req: Request, res: Response) => {
            return new GetUserController().handle(req, res);
        });

        router.get("/", (req: Request, res: Response) => {
            return new ListUserController().handle(req, res);
        });

        router.delete("/:username", (req: Request, res: Response) => {
            return new DeleteUserController().handle(req, res);
        });

        router.put("/:username", (req: Request, res: Response) => {
            return new UpdateUserController().handle(req, res);
        });

        return router;
    }
}
