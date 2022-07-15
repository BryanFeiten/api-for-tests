import {
    Request,
    Response
} from "express";

import { GetPostListUseCase } from "../../domain/usecases/get_post_list.usecase";

export class GetPostListController {
    async handle(request: Request, response: Response) {
        try {
            const useCase = new GetPostListUseCase();
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
