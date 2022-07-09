import { DeleteUserUseCase } from "../../domain/usecases/delete_user.usecase";
import { Request, Response } from "express";

export class DeleteUserController {
    async handle(request: Request, response: Response) {
        try {
            const { userUid } = request.params;
            const password = request.body.password;

            const useCase = new DeleteUserUseCase();
            
            await useCase.run(userUid, password);

            return response.status(200).send({
                success: true,
                data: true,
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
