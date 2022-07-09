import * as bcrypt from 'bcrypt';

import { CacheRepository } from "../../../../core/infra/database/repositories/cache.repository";
import { UserRepository } from "../../infra/database/repositories/user.repository";

export class DeleteUserUseCase {
    async run(uid: string, password: string): Promise<void> {
        // const cacheRepository = new CacheRepository();
        const repository = new UserRepository();

        const user = await repository.getByUid(uid);

        if (!user) {
            throw new Error("Usuário não encontrado");
        }

        if (!(await bcrypt.compare(password, user.password))) {
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
