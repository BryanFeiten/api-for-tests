import {
    Request,
    Response,
} from "express";

import '../../../../shared/utils';
import { SignInUseCase } from "../../domain/usecases/sign_in.usecase";
import { SignInDto } from "../../domain/dtos/sign_in.dto";

export class SignInController {
    async handle(request: Request, response: Response) {
        try {
            const { email, password } = request.body;

            const useCase = new SignInUseCase();
            const result = await useCase.run(new SignInDto(email, password));

            if (result.isEmpty()) {
                return response.status(500).send({
                    success: false,
                    data: 'E-mail ou Senha incorreto(s)',
                });
            }

            return response.status(200).send({
                success: true,
                data: result,
                statusCode: 200,
            });
        } catch (error) {
            return response.status(500).send({
                success: false,
                data: error instanceof Error ? error.message : "unknown",
            });
        }
    }
}
