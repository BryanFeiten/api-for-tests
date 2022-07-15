import { AccountEntity } from "../../../../core/infra/database/entities/account";
import { AccountRepository } from "../../infra/database/repositories/account.repository";

export class GetAccountListUseCase {
    async run(): Promise<AccountEntity[]> {
        // const cacheRepository = new CacheRepository();
        let accountList: AccountEntity[] = [];
        // se tiver no cache, pega do cache
        // const cachedUsers = await cacheRepository.get("users");
        // if (cachedUsers) {
        //     return {
        //         ...cachedUsers,
        //         cache: true,
        //     };
        // }

        const repository = new AccountRepository();
        try {
            accountList = await repository.list();
        } catch (error) {
            throw new Error('Erro na comunicação com o banco');
        }

        // set no cache
        // await cacheRepository.setEx("users", result);

        return accountList;
    }
}
