import { PostEntity } from "../../../../core/infra/database/entities/post";
import { PostRepository } from "../../infra/database/repositories/post.repository";

export class DeletePostUseCase {
    async run(uid: string, accountUid: string): Promise<boolean> {
        const repository = new PostRepository();

        let post: PostEntity;

        try {
            post = await repository.getByUid(uid);
        } catch (error) {
            throw new Error("Postagem não encontrada");
        }

        if (!post) {
            throw new Error("Postagem não encontrada");
        }

        if (post.accountUid !== accountUid) {
            throw new Error("Somente o autor da postagem pode removê-lo");
        }

        let postDeleted = false;

        try {
            postDeleted = await repository.delete(uid);
        } catch (error) {
            throw new Error('Erro na comunicação com o banco');
        }

        return postDeleted;
    }
}
