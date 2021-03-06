import {
    Request,
    Response,
} from "express";

import { AccountDto } from "../../domain/dtos/account.dto";
import { CreateAccountUseCase } from "../../domain/usecases";
import { CustomError } from "../../../../shared/presentation/errors/custom.error";

export class CreateAccountController {
    constructor(private usecase: CreateAccountUseCase) {}

    async handle(request: Request, response: Response) {
        try {
            const {
                username,
                firstName,
                lastName,
                email,
                password,
            } = request.body;

            const result = await this.usecase.run(
                new AccountDto(
                    username.trim(),
                    firstName.trim(),
                    lastName.trim(),
                    email.trim(),
                    password.trim(),
                ),
            );

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
                data: "Erro inesperado, por favor entre em contato ou aguarde",
            });
        }
    }
}
