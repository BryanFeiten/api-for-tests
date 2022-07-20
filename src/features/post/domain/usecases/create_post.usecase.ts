import { PostEntity } from "../../../../core/infra/database/entities/post";
import { CacheRepository } from "../../../../core/infra/database/repositories/cache.repository";
import { ServerError } from "../../../../shared/presentation/errors";
import { charactersLengthValidator } from "../../../../shared/utils/validators";
import { PostRepository } from "../../infra/database/repositories/post.repository";
import { PostDto } from "../dtos/post.dto";

export class CreatePostUseCase {
    constructor(private repository: PostRepository, private cacheRepository: CacheRepository) {}

    async run(post: PostDto): Promise<PostEntity> {
        let postCreated: PostEntity;

        charactersLengthValidator(post.title.trim(), 'Título', 3, 50);
        charactersLengthValidator(post.description.trim(), 'Descrição', 2);

        try {
            postCreated = await this.repository.create(post);
        } catch (error) {
            throw new ServerError('Erro ao criar postagem');
        }

        await this.cacheRepository.delete('posts');

        return postCreated;
    }
}
