import { compare } from 'bcrypt';
import { BadRequestError, ServerError } from '../../../../shared/presentation/errors';

import { AccountRepository } from "../../infra/database/repositories/account.repository";

export class DeleteAccountUseCase {
    async run(uid: string, password: string): Promise<void> {
        // const cacheRepository = new CacheRepository();
        const repository = new AccountRepository();

        const account = await repository.getByUid(uid);

        if (!account) {
            throw new BadRequestError("Usuário não encontrado");
        }

        if (!(await compare(password, account.password))) {
            throw new BadRequestError('Senha incorreta');
        }

        try {
            await repository.delete(uid);
        } catch (error) {
            throw new ServerError('Erro na comunicação com o banco');
        }

        // cache geral
        // await cacheRepository.delete("users");

        // cache do user
        // await cacheRepository.delete(`users:${username}`);
        // await cacheRepository.setEx(`users:${username}`, user);
    }
}
