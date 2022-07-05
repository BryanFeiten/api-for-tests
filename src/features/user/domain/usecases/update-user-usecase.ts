import { CacheRepository } from "../../../../core/infra/database/repositories/cache-repository";
import { UserRepository } from "../../infra/database/repositories/user-repository";

export interface UpdateParams {
    username: string;
    name?: string;
    city?: string;
}

export class UpdateUserUseCase {
    async run(params: UpdateParams): Promise<void> {
        const cacheRepository = new CacheRepository();
        const repository = new UserRepository();

        const user = await repository.get(params.username);
        if (!user) {
            throw new Error("User does not exist");
        }

        await repository.update(user, params);

        // cache geral
        await cacheRepository.delete("users");

        // cache do user
        await cacheRepository.delete(`users:${params.username}`);
        await cacheRepository.setEx(`users:${params.username}`, user);
    }
}
