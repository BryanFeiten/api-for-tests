import {
    charactersLengthValidator,
    emailValidator,
} from "../../../../shared/utils";
import { AuthenticationRepository } from "../../infra/database/repositories/authentication.repository";
import { SignInDto } from "../dtos/sign_in.dto";
import { JwtAdapter } from "../../../../shared/adapters/jwt.adapter";
import { BadRequestError, ServerError } from "../../../../shared/presentation/errors";

export class SignInUseCase {
    constructor(private repository: AuthenticationRepository) {}

    async run(signInDto: SignInDto): Promise<string> {
        charactersLengthValidator(signInDto.email.trim(), 'E-mail', 10, 100);
        emailValidator(signInDto.email.trim());
        charactersLengthValidator(signInDto.password.trim(), 'Senha', 6, 75);

        let logged = false;
        let userUid = '';

        try {
            userUid = await this.repository.getAccountByEmail(signInDto.email);
        } catch (error) {
            throw new ServerError('Erro na comunicação com o banco');
        }

        if (userUid.isEmpty()) {
            throw new BadRequestError('E-mail ou Senha incorreto(s)');
        }

        try {
            logged = await this.repository.validatePassword(userUid, signInDto.password);
        } catch (error) {
            throw new ServerError('Erro na comunicação com o banco');
        }

        if (logged) {
            const jwt = new JwtAdapter(process.env.JWT_SECRET as string);

            return await jwt.encrypt(userUid);
        } else {
            throw new BadRequestError('E-mail ou Senha incorreto(s)');
        }
    }
}
