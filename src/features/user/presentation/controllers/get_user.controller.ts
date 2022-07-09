import { Request, Response } from "express";
import { GetUserUseCase } from "../../domain/usecases/get_user.usecase";

export class GetUserController {
    async handle(request: Request, response: Response) {
        try {
            const { username } = request.params;

            const useCase = new GetUserUseCase();
            const result = await useCase.run(username);

            return response.status(200).send({
                success: true,
                data: result,
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
