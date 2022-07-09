import { CacheRepository } from "../../../../core/infra/database/repositories/cache.repository";
import { UserRepository } from "../../infra/database/repositories/user.repository";
import { UserEntity } from "../../../../core/infra/database/entities/user";

export class GetUserUseCase {
    async run(username: string): Promise<UserEntity> {
        const repository = new UserRepository();
        // const cacheRepository = new CacheRepository();
        let user: UserEntity;

        // const cachedUser = await cacheRepository.get(`users:${uid}`);
        // if (cachedUser) {
        //     return {
        //         ...cachedUser,
        //         cache: true,
        //     };
        // }

        try {
            user = await repository.getByUsername(username);
        } catch (error) {
            throw new Error('Erro na comunicação com o banco');
        }

        return user;
    }
}
