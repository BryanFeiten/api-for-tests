import { AccountRepository } from "../../infra/database/repositories/account.repository";
import { AccountEntity } from "../../../../core/infra/database/entities/account";
import { ServerError } from "../../../../shared/presentation/errors";
import { CacheRepository } from "../../../../core/infra/database/repositories/cache.repository";

export class GetAccountUseCase {
    async run(username: string): Promise<AccountEntity> {
        const repository = new AccountRepository();
        const cacheRepository = new CacheRepository();
        let account: AccountEntity;

        const cachedUser = await cacheRepository.get(`users:${username}`);
        if (cachedUser) {
            return {
                ...cachedUser,
                cache: true,
            };
        }

        try {
            account = await repository.getByUsername(username);
        } catch (error) {
            throw new ServerError('Erro na comunicação com o banco');
        }

        await cacheRepository.setEx(`users:${username}`, account);

        return account;
    }
}
