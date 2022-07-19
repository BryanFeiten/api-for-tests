import '../../../../shared/utils';
import { PostEntity } from "../../../../core/infra/database/entities/post";
import { charactersLengthValidator } from "../../../../shared/utils/validators";
import { PostRepository } from "../../infra/database/repositories/post.repository";
import { PostDto } from "../dtos/post.dto";
import { NotFoundError, ServerError } from '../../../../shared/presentation/errors';
import { CacheRepository } from '../../../../core/infra/database/repositories/cache.repository';

export class UpdatePostUseCase {
    async run(post: PostDto): Promise<PostEntity> {
        const cacheRepository = new CacheRepository();
        const repository = new PostRepository();

        let actualPost: PostEntity;
        let postUpdated: PostEntity;

        if (post.title.isNotEmpty()) {
            charactersLengthValidator(post.title.trim(), 'Título', 3, 50);
        }

        if (post.description.isNotEmpty()) {
            charactersLengthValidator(post.description.trim(), 'Descrição', 2);
        }

        try {
            actualPost = await repository.getByUid(post.uid!);
        } catch (error) {
            throw new NotFoundError('Postagem não encontrada');
        }

        try {
            postUpdated = await repository.update(post, actualPost);
        } catch (error) {
            throw new ServerError('Erro na comunicação com o banco');
        }

        await cacheRepository.delete('posts');
        await cacheRepository.setEx(`posts:${postUpdated.uid}`, postUpdated);

        return postUpdated;
    }
}
