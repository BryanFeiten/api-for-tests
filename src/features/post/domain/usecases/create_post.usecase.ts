import { PostEntity } from "../../../../core/infra/database/entities/post";
import { charactersLengthValidator } from "../../../../shared/utils/validators";
import { PostRepository } from "../../infra/database/repositories/post.repository";
import { PostDto } from "../dtos/post.dto";

export class CreatePostUseCase {
    async run(post: PostDto): Promise<PostEntity> {
        const repository = new PostRepository();
        let postCreated: PostEntity;

        charactersLengthValidator(post.title.trim(), 'Título', 3, 50);
        charactersLengthValidator(post.description.trim(), 'Descrição', 2);

        try {
            postCreated = await repository.create(post);

            if (!postCreated) {
                throw new Error('Erro ao criar postagem');
            }
        } catch (error) {
            throw new Error('Erro na comunicação com o banco');
        }

        return postCreated;
    }
}
