import { Request, Response } from "express";
import { ListUserUseCase } from "../../domain/usecases/list_users.usecase";

export class ListUserController {
    async handle(request: Request, response: Response) {
        try {
            const useCase = new ListUserUseCase();
            const result = await useCase.run();

            return response.status(200).send({
                success: true,
                data: result,
                statusCode: 200,
            });
        } catch (error) {
            return response.status(500).send({
                success: false,
                data: error instanceof Error ? error.message : "unknown",
            });
        }
    }
}
