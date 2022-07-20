import { PostEntity } from "../../../../core/infra/database/entities/post";
import { CacheRepository } from "../../../../core/infra/database/repositories/cache.repository";
import { NotFoundError, ServerError, UnauthorizedError } from "../../../../shared/presentation/errors";
import { PostRepository } from "../../infra/database/repositories/post.repository";

export class DeletePostUseCase {
    constructor(private repository: PostRepository, private cacheRepository: CacheRepository) {}

    async run(uid: string, accountUid: string): Promise<boolean> {
        let post: PostEntity;

        try {
            post = await this.repository.getByUid(uid);
        } catch (error) {
            throw new NotFoundError("Postagem não encontrada");
        }

        if (post.accountUid !== accountUid) {
            throw new UnauthorizedError("Somente o autor da postagem pode removê-lo");
        }

        let postDeleted = false;

        try {
            postDeleted = await this.repository.delete(uid);
        } catch (error) {
            throw new ServerError('Erro na comunicação com o banco');
        }

        this.cacheRepository.delete('posts');
        this.cacheRepository.delete(`posts:${uid}`);

        return postDeleted;
    }
}
