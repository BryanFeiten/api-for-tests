import {
    Request,
    Response
} from "express";

import { DeletePostUseCase } from "../../domain/usecases/delete_post.usecase";

export class DeletePostController {
    async handle(request: Request, response: Response) {
        try {
            const { uid } = request.params;
            const accountUid = request.body.accountUid;

            const useCase = new DeletePostUseCase();

            await useCase.run(uid, accountUid);

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
