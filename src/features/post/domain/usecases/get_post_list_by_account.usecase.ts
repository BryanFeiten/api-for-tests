import { PostRepository } from "../../infra/database/repositories/post.repository";
import { PostEntity } from "../../../../core/infra/database/entities/post";

export class GetPostListByAccountUseCase {
    async run(accountUid: string): Promise<PostEntity[]> {
        const repository = new PostRepository();
        let postList: PostEntity[];

        try {
            postList = await repository.getByAccountUid(accountUid);
        } catch (error) {
            throw new Error('Erro na comunicação com o banco');
        }

        return postList;
    }
}
