import '../../../../shared/utils';
import { AccountEntity } from "../../../../core/infra/database/entities/account";
import { CacheRepository } from "../../../../core/infra/database/repositories/cache.repository";
import { charactersLengthValidator } from "../../../../shared/utils/validators";
import { AccountRepository } from "../../infra/database/repositories/account.repository";
import { AccountDto } from "../dtos/account.dto";
import { NotFoundError, ServerError } from '../../../../shared/presentation/errors';

export class UpdateAccountUseCase {
    constructor(private repository: AccountRepository, private cacheRepository: CacheRepository) {}
    
    async run(account: AccountDto): Promise<boolean> {
        let actualAccount: AccountEntity | undefined;
        let accountUpdated: boolean;

        if (account.firstName.isNotEmpty()) {
            charactersLengthValidator(account.firstName.trim(), 'Nome', 3, 30);
        }

        if (account.lastName.isNotEmpty()) {
            charactersLengthValidator(account.lastName.trim(), 'Sobrenome', 3, 30);
        }

        try {
            actualAccount = await this.repository.getByUid(account.uid!);
        } catch (error) {
            throw new NotFoundError('Usuário não encontrado');
        }

        try {
            if (!actualAccount) throw new NotFoundError('Usuário não encontrado');

            accountUpdated = await this.repository.update(account, actualAccount);
        } catch (error) {
            throw new ServerError('Erro na comunicação com o banco');
        }

        await this.cacheRepository.delete("users");

        await this.cacheRepository.setEx(`users:${account.username}`, account);
        return accountUpdated;
    }
}
