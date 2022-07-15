import {
    charactersLengthValidator,
    emailValidator,
} from "../../../../shared/utils/validators";
import { AccountRepository } from "../../infra/database/repositories/account.repository";
import { AccountDto } from "../dtos/account.dto";

export class CreateAccountUseCase {
    async run(account: AccountDto): Promise<boolean> {
        const repository = new AccountRepository();
        // const cacheRepository = new CacheRepository();
        let accountCreated: boolean;

        charactersLengthValidator(account.username.trim(), 'Nome de Usuário', 3, 30);
        charactersLengthValidator(account.firstName.trim(), 'Nome', 3, 30);
        charactersLengthValidator(account.lastName.trim(), 'Sobrenome', 3, 30);
        charactersLengthValidator(account.email.trim(), 'E-mail', 10, 100);
        emailValidator(account.email.trim());
        charactersLengthValidator(account.password.trim(), 'Senha', 6, 75);

        try {
            const emailAlreadyExists = await repository.getByEmail(account.email);

            if (emailAlreadyExists) {
                throw new Error('E-mail já cadastrado na plataforma');
            }

            let usernameAlreadyExists: boolean;

            try {
                usernameAlreadyExists = !!await repository.getByUsername(account.username);
            } catch (error) {
                usernameAlreadyExists = false;
            }

            if (usernameAlreadyExists) {
                throw new Error('Nome de usuário não está disponível');
            }

            accountCreated = await repository.create(account);

            if (!accountCreated) {
                throw new Error('Erro ao criar usuário');
            }
        } catch (error) {
            throw new Error('Erro na comunicação com o banco');
        }
        // await cacheRepository.set(`users:${user.username}`, user);
        // await cacheRepository.delete("users");

        return accountCreated;
    }
}
