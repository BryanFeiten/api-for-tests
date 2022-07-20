import { PostRepository } from "../../infra/database/repositories/post.repository";
import { PostEntity } from "../../../../core/infra/database/entities/post";
import { NotFoundError } from "../../../../shared/presentation/errors";
import { CacheRepository } from "../../../../core/infra/database/repositories/cache.repository";

export class GetPostByUidUseCase {
    constructor(private repository: PostRepository, private cacheRepository: CacheRepository) {}

    async run(uid: string): Promise<PostEntity> {
        const cashedPost = await this.cacheRepository.get(`posts:${uid}`);

        if (cashedPost) return cashedPost;

        let post: PostEntity;

        try {
            post = await this.repository.getByUid(uid);
        } catch (error) {
            throw new NotFoundError("Postagem não encontrada");
        }

        await this.cacheRepository.setEx(`posts:${post.uid}`, post);

        return post;
    }
}
