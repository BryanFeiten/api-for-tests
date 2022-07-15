import {
    Request,
    Response
} from "express";

import { GetPostByUidUseCase } from "../../domain/usecases/get_post_by_uid.usecase";

export class GetPostByUidController {
    async handle(request: Request, response: Response) {
        const { uid } = request.params;
        const useCase = new GetPostByUidUseCase();

        try {
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
