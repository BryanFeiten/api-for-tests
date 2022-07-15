import { PostEntity } from "../../../../core/infra/database/entities/post";
import { PostRepository } from "../../infra/database/repositories/post.repository";

export class GetPostListUseCase {
    async run(): Promise<PostEntity[]> {
        let postList: PostEntity[] = [];

        const repository = new PostRepository();
        try {
            postList = await repository.postList();
        } catch (error) {
            throw new Error('Erro na comunicação com o banco');
        }

        return postList;
    }
}