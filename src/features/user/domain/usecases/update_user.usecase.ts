import { UserEntity } from "../../../../core/infra/database/entities/user";
import { CacheRepository } from "../../../../core/infra/database/repositories/cache.repository";
import { UserRepository } from "../../infra/database/repositories/user.repository";
import { UserDto } from "../dto/user.dto";

export class UpdateUserUseCase {
    async run(user: UserDto): Promise<boolean> {
        // const cacheRepository = new CacheRepository();
        const repository = new UserRepository();
        let actualUser: UserEntity;
        let updated: boolean;

        try {
            actualUser = await repository.getByUid(user.uid!);

            updated = await repository.update(user, actualUser);
        } catch (error) {
            throw new Error('Erro na comunicação com o banco');
        }

        // cache geral
        // await cacheRepository.delete("users");
        
        // cache do user
        // await cacheRepository.delete(`users:${params.username}`);
        // await cacheRepository.setEx(`users:${params.username}`, user);
        return updated;
    }
}
