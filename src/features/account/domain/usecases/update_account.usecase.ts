import '../../../../shared/utils';
import { AccountEntity } from "../../../../core/infra/database/entities/account";
import { CacheRepository } from "../../../../core/infra/database/repositories/cache.repository";
import { charactersLengthValidator } from "../../../../shared/utils/validators";
import { AccountRepository } from "../../infra/database/repositories/account.repository";
import { AccountDto } from "../dtos/account.dto";

export class UpdateAccountUseCase {
    async run(account: AccountDto): Promise<boolean> {
        // const cacheRepository = new CacheRepository();
        const repository = new AccountRepository();
        let actualAccount: AccountEntity;
        let accountUpdated: boolean;

        if (account.firstName.isNotEmpty()) {
            charactersLengthValidator(account.firstName.trim(), 'Nome', 3, 30);
        }

        if (account.lastName.isNotEmpty()) {
            charactersLengthValidator(account.lastName.trim(), 'Sobrenome', 3, 30);
        }

        try {
            actualAccount = await repository.getByUid(account.uid!);

            accountUpdated = await repository.update(account, actualAccount);
        } catch (error) {
            throw new Error('Erro na comunicação com o banco');
        }

        // cache geral
        // await cacheRepository.delete("users");

        // cache do user
        // await cacheRepository.delete(`users:${params.username}`);
        // await cacheRepository.setEx(`users:${params.username}`, user);
        return accountUpdated;
    }
}
