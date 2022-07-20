import { AccountRepository } from "../../infra/database/repositories/account.repository";
import { AccountEntity } from "../../../../core/infra/database/entities/account";
import { ServerError } from "../../../../shared/presentation/errors";
import { CacheRepository } from "../../../../core/infra/database/repositories/cache.repository";

export class GetAccountUseCase {
    constructor(private repository: AccountRepository, private cacheRepository: CacheRepository) {}

    async run(username: string): Promise<AccountEntity> {
        let account: AccountEntity;

        const cachedUser = await this.cacheRepository.get(`users:${username}`);
        if (cachedUser) {
            return {
                ...cachedUser,
                cache: true,
            };
        }

        try {
            account = await this.repository.getByUsername(username);
        } catch (error) {
            throw new ServerError('Erro na comunicação com o banco');
        }

        await this.cacheRepository.setEx(`users:${username}`, account);

        return account;
    }
}
