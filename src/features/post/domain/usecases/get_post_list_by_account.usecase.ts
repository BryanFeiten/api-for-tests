import { PostRepository } from "../../infra/database/repositories/post.repository";
import { PostEntity } from "../../../../core/infra/database/entities/post";
import { NotFoundError, ServerError } from "../../../../shared/presentation/errors";
import { AccountRepository } from "../../../account/infra/database/repositories/account.repository";
import { CacheRepository } from "../../../../core/infra/database/repositories/cache.repository";

export class GetPostListByAccountUseCase {
    async run(accountUid: string): Promise<PostEntity[]> {
        const cacheRepository = new CacheRepository();
        const accountRepository = new AccountRepository();
        const repository = new PostRepository();
        let userExists = false;

        const cachedPosts = await cacheRepository.get(`posts/user:${accountUid}`);

        if (cachedPosts) return cachedPosts;

        try {
            userExists = !!await accountRepository.getByUid(accountUid);
        } catch (error) {
            throw new ServerError('Erro na comunicação com o banco');
        }

        if (!userExists) throw new NotFoundError('Usuário não encontrado');

        let postList: PostEntity[] = [];

        try {
            postList = await repository.getByAccountUid(accountUid);
        } catch (error) {
            throw new ServerError('Erro na comunicação com o banco');
        }

        await cacheRepository.setEx(`posts/user:${accountUid}`, postList);

        return postList;
    }
}
