import { compare } from 'bcrypt';
import { CacheRepository } from '../../../../core/infra/database/repositories/cache.repository';
import { BadRequestError, ServerError } from '../../../../shared/presentation/errors';

import { AccountRepository } from "../../infra/database/repositories/account.repository";

export class DeleteAccountUseCase {
    constructor(private repository: AccountRepository, private cacheRepository: CacheRepository) {}

    async run(uid: string, password: string): Promise<void> {
        const account = await this.repository.getByUid(uid);

        if (!account) {
            throw new BadRequestError("Usuário não encontrado");
        }

        if (!(await compare(password, account.password))) {
            throw new BadRequestError('Senha incorreta');
        }

        try {
            await this.repository.delete(uid);
        } catch (error) {
            throw new ServerError('Erro na comunicação com o banco');
        }

        await this.cacheRepository.delete("users");
        await this.cacheRepository.delete(`users:${account.username}`);
    }
}
