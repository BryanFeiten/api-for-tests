import { AccountEntity } from "../../../../core/infra/database/entities/account";
import { CacheRepository } from "../../../../core/infra/database/repositories/cache.repository";
import { ServerError } from "../../../../shared/presentation/errors";
import { AccountRepository } from "../../infra/database/repositories/account.repository";

export class GetAccountListUseCase {
    async run(): Promise<AccountEntity[]> {
        const cacheRepository = new CacheRepository();
        let accountList: AccountEntity[] = [];
        const cachedUsers = await cacheRepository.get("users");

        if (cachedUsers) return cachedUsers;

        const repository = new AccountRepository();
        try {
            accountList = await repository.list();
        } catch (error) {
            throw new ServerError('Erro na comunicação com o banco');
        }

        await cacheRepository.setEx("users", accountList);

        return accountList;
    }
}
