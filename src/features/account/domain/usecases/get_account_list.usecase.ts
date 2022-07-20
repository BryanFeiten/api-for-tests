import { AccountEntity } from "../../../../core/infra/database/entities/account";
import { CacheRepository } from "../../../../core/infra/database/repositories/cache.repository";
import { ServerError } from "../../../../shared/presentation/errors";
import { AccountRepository } from "../../infra/database/repositories/account.repository";

export class GetAccountListUseCase {
    constructor(private repository: AccountRepository, private cacheRepository: CacheRepository) {}

    async run(): Promise<AccountEntity[]> {
        let accountList: AccountEntity[] = [];
        const cachedUsers = await this.cacheRepository.get("users");

        if (cachedUsers) return cachedUsers;

        try {
            accountList = await this.repository.list();
        } catch (error) {
            throw new ServerError('Erro na comunicação com o banco');
        }

        await this.cacheRepository.setEx("users", accountList);

        return accountList;
    }
}
