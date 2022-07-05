import { UpdateUserUseCase } from "./../../domain/usecases/update-user-usecase";
import { DeleteUserUseCase } from "../../domain/usecases/delete-user-usecase";
import { Request, Response } from "express";
import { ListUserUseCase } from "../../domain/usecases/list-users-usecase";

export class UpdateUserController {
    async handle(request: Request, response: Response) {
        try {
            const { username } = request.params;
            const { name, city } = request.body;

            if (!username) {
                return response.status(400).send({
                    ok: false,
                    message: "username not provided",
                });
            }

            const useCase = new UpdateUserUseCase();
            await useCase.run({
                username,
                name,
                city,
            });

            return response.status(200).send({
                ok: true,
                message: "ok",
            });
        } catch (error) {
            return response.status(500).send({
                ok: false,
                message: error instanceof Error ? error.message : "unknown",
                exception: true,
            });
        }
    }
}
