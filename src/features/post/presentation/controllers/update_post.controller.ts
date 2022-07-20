import {
    Request,
    Response
} from "express";

import { PostDto } from "../../domain/dtos/post.dto";
import { UpdatePostUseCase } from "../../domain/usecases";
import { PostEntity } from "../../../../core/infra/database/entities/post";
import { CustomError } from "../../../../shared/presentation/errors/custom.error";

export class UpdatePostController {
    constructor(private usecase: UpdatePostUseCase) { }

    async handle(request: Request, response: Response) {
        const { uid } = request.params;
        const { accountUid, firstName, lastName } = request.body;

        let postUpdated: PostEntity;

        try {
            postUpdated = await this.usecase.run(
                new PostDto(accountUid, firstName.trim() ?? '', lastName.trim() ?? '', uid),
            );

            return response.status(200).json({
                success: true,
                data: postUpdated,
            });
        } catch (error) {
            if (error instanceof CustomError) {
                return response.status(error.code).json({
                    success: false,
                    data: error.message,
                })
            }

            return response.status(500).json({
                ok: false,
                data: error instanceof Error
                    ? error.message
                    : "unknown",
            });
        }
    }
}
