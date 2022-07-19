import { PostEntity } from "../../../../core/infra/database/entities/post";
import { CacheRepository } from "../../../../core/infra/database/repositories/cache.repository";
import { ServerError } from "../../../../shared/presentation/errors";
import { charactersLengthValidator } from "../../../../shared/utils/validators";
import { PostRepository } from "../../infra/database/repositories/post.repository";
import { PostDto } from "../dtos/post.dto";

export class CreatePostUseCase {
    async run(post: PostDto): Promise<PostEntity> {
        const cacheRepository = new CacheRepository();
        const repository = new PostRepository();
        let postCreated: PostEntity;

        charactersLengthValidator(post.title.trim(), 'Título', 3, 50);
        charactersLengthValidator(post.description.trim(), 'Descrição', 2);

        try {
            postCreated = await repository.create(post);
        } catch (error) {
            throw new ServerError('Erro ao criar postagem');
        }

        await cacheRepository.delete('posts');

        return postCreated;
    }
}
