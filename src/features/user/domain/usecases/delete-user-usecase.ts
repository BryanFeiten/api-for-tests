import { CacheRepository } from "../../../../core/infra/database/repositories/cache-repository";
import { UserRepository } from "../../infra/database/repositories/user-repository";

export class DeleteUserUseCase {
    async run(username: string): Promise<void> {
        const cacheRepository = new CacheRepository();
        const repository = new UserRepository();

        const user = await repository.get(username);
        if (!user) {
            throw new Error("User does not exist");
        }

        await repository.delete(username);

        // cache geral
        await cacheRepository.delete("users");

        // cache do user
        await cacheRepository.delete(`users:${username}`);
        // await cacheRepository.setEx(`users:${username}`, user);
    }
}
