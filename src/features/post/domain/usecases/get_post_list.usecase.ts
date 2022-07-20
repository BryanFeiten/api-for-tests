import { PostEntity } from "../../../../core/infra/database/entities/post";
import { CacheRepository } from "../../../../core/infra/database/repositories/cache.repository";
import { ServerError } from "../../../../shared/presentation/errors";
import { PostRepository } from "../../infra/database/repositories/post.repository";

export class GetPostListUseCase {
    constructor(private repository: PostRepository, private cacheRepository: CacheRepository) {}

    async run(): Promise<PostEntity[]> {
        let postList: PostEntity[] = [];

        const cachedPosts = await this.cacheRepository.get('posts');

        if (cachedPosts) return cachedPosts;

        try {
            postList = await this.repository.postList();
        } catch (error) {
            throw new ServerError('Erro na comunicação com o banco');
        }

        await this.cacheRepository.setEx('posts', postList);

        return postList;
    }
}
