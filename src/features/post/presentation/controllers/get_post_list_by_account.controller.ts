import {
    Request,
    Response
} from "express";

import { GetPostListByAccountUseCase } from "../../domain/usecases";

export class GetPostListByAccountController {
    async handle(request: Request, response: Response) {
        const { uid } = request.params;

        try {
            const useCase = new GetPostListByAccountUseCase();
            const result = await useCase.run(uid);

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
