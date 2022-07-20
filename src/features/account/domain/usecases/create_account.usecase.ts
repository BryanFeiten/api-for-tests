import {
    charactersLengthValidator,
    emailValidator,
} from "../../../../shared/utils/validators";
import { AccountDto } from "../dtos/account.dto";
import { AccountRepository } from "../../infra/database/repositories/account.repository";
import { BadRequestError, ServerError } from "../../../../shared/presentation/errors";
import { CacheRepository } from "../../../../core/infra/database/repositories/cache.repository";

export class CreateAccountUseCase {
    constructor(private repository: AccountRepository, private cacheRepository: CacheRepository) {}

    async run(account: AccountDto): Promise<boolean> {
        let accountCreated: boolean;

        charactersLengthValidator(account.username.trim(), 'Nome de Usuário', 3, 30);
        charactersLengthValidator(account.firstName.trim(), 'Nome', 3, 30);
        charactersLengthValidator(account.lastName.trim(), 'Sobrenome', 3, 30);
        charactersLengthValidator(account.email.trim(), 'E-mail', 10, 100);
        emailValidator(account.email.trim());
        charactersLengthValidator(account.password.trim(), 'Senha', 6, 75);
        let emailAlreadyExists = true;

        try {
            emailAlreadyExists = await this.repository.getByEmail(account.email);
        } catch (error) {
            throw new ServerError('Erro na comunicação com o banco');
        }

        if (emailAlreadyExists) {
            throw new BadRequestError('E-mail já cadastrado na plataforma');
        }

        let usernameAlreadyExists: boolean;

        try {
            usernameAlreadyExists = !!await this.repository.getByUsername(account.username);
        } catch (error) {
            usernameAlreadyExists = false;
        }

        if (usernameAlreadyExists) {
            throw new BadRequestError('Nome de usuário não está disponível');
        }

        accountCreated = await this.repository.create(account);

        if (!accountCreated) {
            throw new ServerError('Erro ao criar usuário');
        }
        await this.cacheRepository.delete("users");

        return accountCreated;
    }
}
