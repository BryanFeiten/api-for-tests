import {
    charactersLengthValidator,
    emailValidator,
} from "../../../../shared/utils/validators";
import { AccountDto } from "../dtos/account.dto";
import { AccountRepository } from "../../infra/database/repositories/account.repository";
import { BadRequestError, ServerError } from "../../../../shared/presentation/errors";

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
        let emailAlreadyExists = true;

        try {
            emailAlreadyExists = await repository.getByEmail(account.email);
        } catch (error) {
            throw new ServerError('Erro na comunicação com o banco');
        }

        if (emailAlreadyExists) {
            throw new BadRequestError('E-mail já cadastrado na plataforma');
        }

        let usernameAlreadyExists: boolean;

        try {
            usernameAlreadyExists = !!await repository.getByUsername(account.username);
        } catch (error) {
            usernameAlreadyExists = false;
        }

        if (usernameAlreadyExists) {
            throw new BadRequestError('Nome de usuário não está disponível');
        }

        accountCreated = await repository.create(account);

        if (!accountCreated) {
            throw new ServerError('Erro ao criar usuário');
        }
        // await cacheRepository.set(`users:${user.username}`, user);
        // await cacheRepository.delete("users");

        return accountCreated;
    }
}
