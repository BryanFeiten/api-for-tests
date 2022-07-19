import {
    Request,
    Response,
} from "express";

import { CreatePostUseCase } from "../../domain/usecases";
import { PostDto } from "../../domain/dtos/post.dto";

export class CreatePostController {
    async handle(request: Request, response: Response) {
        try {
            const {
                accountUid,
                title,
                description,
            } = request.body;

            const useCase = new CreatePostUseCase();
            const result = await useCase.run(
                new PostDto(
                    accountUid,
                    title.trim(),
                    description.trim(),
                ),
            );

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
