import { PostRepository } from "../../infra/database/repositories/post.repository";
import { PostEntity } from "../../../../core/infra/database/entities/post";
import { NotFoundError } from "../../../../shared/presentation/errors";

export class GetPostByUidUseCase {
    async run(uid: string): Promise<PostEntity> {
        const repository = new PostRepository();
        let post: PostEntity;

        try {
            post = await repository.getByUid(uid);
        } catch (error) {
            throw new NotFoundError("Postagem não encontrada");
        }

        return post;
    }
}
