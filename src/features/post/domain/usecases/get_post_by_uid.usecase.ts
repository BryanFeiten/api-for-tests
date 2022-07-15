import { PostRepository } from "../../infra/database/repositories/post.repository";
import { PostEntity } from "../../../../core/infra/database/entities/post";

export class GetPostByUidUseCase {
    async run(uid: string): Promise<PostEntity> {
        const repository = new PostRepository();
        let post: PostEntity;

        try {
            post = await repository.getByUid(uid);
        } catch (error) {
            throw new Error("Postagem não encontrada");
        }

        return post;
    }
}
