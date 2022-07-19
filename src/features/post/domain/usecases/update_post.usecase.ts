import '../../../../shared/utils';
import { PostEntity } from "../../../../core/infra/database/entities/post";
import { charactersLengthValidator } from "../../../../shared/utils/validators";
import { PostRepository } from "../../infra/database/repositories/post.repository";
import { PostDto } from "../dtos/post.dto";

export class UpdatePostUseCase {
    async run(post: PostDto): Promise<PostEntity> {
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

            postUpdated = await repository.update(post, actualPost);
        } catch (error) {
            throw new Error('Erro na comunicação com o banco');
        }

        return postUpdated;
    }
}
