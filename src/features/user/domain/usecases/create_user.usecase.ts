import { UserEntity } from "../../../../core/infra/database/entities/user";
import { CacheRepository } from "../../../../core/infra/database/repositories/cache.repository";
import { caractersLengthValidator, emailValidator } from "../../../../shared/utils/helpers";
import { UserRepository } from "../../infra/database/repositories/user.repository";
import { UserDto } from "../dto/user.dto";

export class CreateUserUseCase {
    async run(user: UserDto): Promise<boolean> {
        const repository = new UserRepository();
        // const cacheRepository = new CacheRepository();
        // let userCreated: boolean;
        let userCreated: boolean;

        caractersLengthValidator(user.username.trim(), 'Nome de Usuário', 3, 30);
        caractersLengthValidator(user.firstName.trim(), 'Nome', 3, 30);
        caractersLengthValidator(user.lastName.trim(), 'Sobrenome', 3, 30);
        caractersLengthValidator(user.email.trim(), 'E-mail', 10, 100);
        emailValidator(user.email.trim());
        caractersLengthValidator(user.password.trim(), 'Senha', 6, 75);

        try {
            const emailAlreadyExists = await repository.getByEmail(user.email);

            if (emailAlreadyExists) {
                throw new Error('E-mail já cadastrado na plataforma');
            }

            let usernameAlreadyExists: boolean;

            try {
                usernameAlreadyExists = !!await repository.getByUsername(user.username);
            } catch (error) {
                usernameAlreadyExists = false;
            }

            if (usernameAlreadyExists) {
                throw new Error('Nome de usuário não está disponível');
            }

            userCreated = await repository.create(user);

            if (!userCreated) {
                throw new Error('Erro ao criar usuário');
            }
        } catch (error) {
            throw new Error('Erro na comunicação com o banco');
        }
        // await cacheRepository.set(`users:${user.username}`, user);
        // await cacheRepository.delete("users");

        return userCreated;
    }
}
