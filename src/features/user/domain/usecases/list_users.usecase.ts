import { UserEntity } from "../../../../core/infra/database/entities/user";
import { CacheRepository } from "../../../../core/infra/database/repositories/cache.repository";
import { UserRepository } from "../../infra/database/repositories/user.repository";

export class ListUserUseCase {
    async run(): Promise<UserEntity[]> {
        // const cacheRepository = new CacheRepository();
        let result: UserEntity[] = [];
        // se tiver no cache, pega do cache
        // const cachedUsers = await cacheRepository.get("users");
        // if (cachedUsers) {
        //     return {
        //         ...cachedUsers,
        //         cache: true,
        //     };
        // }

        const repository = new UserRepository();
        try {
            result = await repository.list();
        } catch (error) {
            throw new Error('Erro na comunicação com o banco');
        }

        // set no cache
        // await cacheRepository.setEx("users", result);

        return result;
    }
}
