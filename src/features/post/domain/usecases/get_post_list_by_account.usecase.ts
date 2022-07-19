import { PostRepository } from "../../infra/database/repositories/post.repository";
import { PostEntity } from "../../../../core/infra/database/entities/post";
import { NotFoundError, ServerError } from "../../../../shared/presentation/errors";
import { AccountRepository } from "../../../account/infra/database/repositories/account.repository";

export class GetPostListByAccountUseCase {
    async run(accountUid: string): Promise<PostEntity[]> {
        const accountRepository = new AccountRepository();
        const repository = new PostRepository();
        let userExists = false;

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

        return postList;
    }
}
