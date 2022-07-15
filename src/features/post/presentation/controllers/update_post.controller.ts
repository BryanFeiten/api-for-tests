import {
    Request,
    Response
} from "express";

import { UpdatePostUseCase } from "../../domain/usecases/update_post.usecase";
import { PostDto } from "../../domain/dtos/post.dto";
import { PostEntity } from "../../../../core/infra/database/entities/post";

export class UpdatePostController {
    async handle(request: Request, response: Response) {
        const { uid } = request.params;
        const { accountUid, firstName, lastName } = request.body;

        let postUpdated: PostEntity;

        try {
            const useCase = new UpdatePostUseCase();
            postUpdated = await useCase.run(
                new PostDto(accountUid, firstName.trim() ?? '', lastName.trim() ?? '', uid),
            );

            return response.status(200).send({
                success: true,
                data: postUpdated,
            });
        } catch (error) {
            return response.status(500).send({
                ok: false,
                data: error instanceof Error
                    ? error.message
                    : "unknown",
            });
        }
    }
}
