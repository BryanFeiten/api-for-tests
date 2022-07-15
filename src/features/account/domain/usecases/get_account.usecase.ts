import { AccountRepository } from "../../infra/database/repositories/account.repository";
import { AccountEntity } from "../../../../core/infra/database/entities/account";

export class GetAccountUseCase {
    async run(username: string): Promise<AccountEntity> {
        const repository = new AccountRepository();
        // const cacheRepository = new CacheRepository();
        let account: AccountEntity;

        // const cachedUser = await cacheRepository.get(`users:${uid}`);
        // if (cachedUser) {
        //     return {
        //         ...cachedUser,
        //         cache: true,
        //     };
        // }

        try {
            account = await repository.getByUsername(username);
        } catch (error) {
            throw new Error('Erro na comunicação com o banco');
        }

        return account;
    }
}
