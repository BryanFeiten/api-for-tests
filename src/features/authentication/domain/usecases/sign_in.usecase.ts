import {
    charactersLengthValidator,
    emailValidator,
} from "../../../../shared/utils";
import { AuthenticationRepository } from "../../infra/database/repositories/authentication.repository";
import { SignInDto } from "../dtos/sign_in.dto";
import { JwtAdapter } from "../../../../shared/adapters/jwt.adapter";

export class SignInUseCase {
    async run(signInDto: SignInDto): Promise<string> {
        charactersLengthValidator(signInDto.email.trim(), 'E-mail', 10, 100);
        emailValidator(signInDto.email.trim());
        charactersLengthValidator(signInDto.password.trim(), 'Senha', 6, 75);

        const repository = new AuthenticationRepository();
        let logged = false;

        try {
            const userUid = await repository.getAccountByEmail(signInDto.email);

            if (userUid.isEmpty()) {
                throw new Error('E-mail ou Senha incorreto(s)');
            }

            logged = await repository.validatePassword(userUid, signInDto.password);

            if (logged) {
                const jwt = new JwtAdapter(process.env.JWT_SECRET as string);

                return await jwt.encrypt(userUid);
            }

        } catch (error) {
            throw new Error('Erro na comunicação com o banco');
        }

        return '';
    }
}
