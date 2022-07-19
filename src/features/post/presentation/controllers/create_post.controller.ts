import {
    Request,
    Response,
} from "express";

import { PostDto } from "../../domain/dtos/post.dto";
import { CreatePostUseCase } from "../../domain/usecases";
import { CustomError } from "../../../../shared/presentation/errors/custom.error";

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

            return response.status(200).json({
                success: true,
                data: result,
                statusCode: 200,
            });
        } catch (error) {
            if (error instanceof CustomError) {
                return response.status(error.code).json({
                    success: false,
                    data: error.message,
                })
            }

            return response.status(500).json({
                success: false,
                data: error instanceof Error ? error.message : "unknown",
            });
        }
    }
}
