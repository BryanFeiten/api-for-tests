import * as bcrypt from 'bcrypt';

import { AccountRepository } from "../../infra/database/repositories/account.repository";

export class DeleteAccountUseCase {
    async run(uid: string, password: string): Promise<void> {
        // const cacheRepository = new CacheRepository();
        const repository = new AccountRepository();

        const account = await repository.getByUid(uid);

        if (!account) {
            throw new Error("Usuário não encontrado");
        }

        if (!(await bcrypt.compare(password, account.password))) {
            throw new Error('Senha incorreta');
        }

        try {
            await repository.delete(uid);
        } catch (error) {
            throw new Error('Erro na comunicação com o banco');
        }

        // cache geral
        // await cacheRepository.delete("users");

        // cache do user
        // await cacheRepository.delete(`users:${username}`);
        // await cacheRepository.setEx(`users:${username}`, user);
    }
}
