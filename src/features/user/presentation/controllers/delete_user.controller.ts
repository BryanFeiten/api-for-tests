import { DeleteUserUseCase } from "../../domain/usecases/delete_user.usecase";
import { Request, Response } from "express";

export class DeleteUserController {
    async handle(request: Request, response: Response) {
        try {
            const { username, password } = request.params;

            const useCase = new DeleteUserUseCase();
            
            await useCase.run(username, password);

            return response.status(200).send({
                success: true,
                message: true,
                statusCode: 200,
            });
        } catch (error) {
            return response.status(500).send({
                success: false,
                message: error instanceof Error ? error.message : "unknown",
            });
        }
    }
}
