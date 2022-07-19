import { PostEntity } from "../../../../core/infra/database/entities/post";
import { CacheRepository } from "../../../../core/infra/database/repositories/cache.repository";
import { ServerError } from "../../../../shared/presentation/errors";
import { PostRepository } from "../../infra/database/repositories/post.repository";

export class GetPostListUseCase {
    async run(): Promise<PostEntity[]> {
        let postList: PostEntity[] = [];

        const cacheRepository = new CacheRepository();
        const repository = new PostRepository();
        
        const cachedPosts = await cacheRepository.get('posts');

        if (cachedPosts) return cachedPosts;

        try {
            postList = await repository.postList();
        } catch (error) {
            throw new ServerError('Erro na comunicação com o banco');
        }

        await cacheRepository.setEx('posts', postList);

        return postList;
    }
}
