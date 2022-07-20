import {
    Request,
    Response,
} from "express";

import '../../../../shared/utils/extension_methods';
import { SignInDto } from "../../domain/dtos/sign_in.dto";
import { SignInUseCase } from "../../domain/usecases/sign_in.usecase";
import { CustomError } from "../../../../shared/presentation/errors/custom.error";

export class SignInController {
    constructor(private usecase: SignInUseCase) {}

    async handle(request: Request, response: Response) {
        try {
            const { email, password } = request.body;

            const result = await this.usecase.run(new SignInDto(email, password));

            if (result.isEmpty()) {
                return response.status(500).json({
                    success: false,
                    data: 'E-mail ou Senha incorreto(s)',
                });
            }

            return response.status(200).json({
                success: true,
                data: result,
                statusCode: 200,
            });
        } catch (error) {
            if (error instanceof CustomError) {
                return response.status(error.code).json({
                    success: false,
                    data: error.message,
                })
            }

            return response.status(500).json({
                success: false,
                data: error instanceof Error ? error.message : "unknown",
            });
        }
    }
}
