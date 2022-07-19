import {
    Request,
    Response
} from "express";

import { GetAccountUseCase } from "../../domain/usecases";

export class GetAccountController {
    async handle(request: Request, response: Response) {
        const { username } = request.params;
        const useCase = new GetAccountUseCase();

        try {
            const result = await useCase.run(username);

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
