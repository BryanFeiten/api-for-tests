import {
    Request,
    Response,
} from "express";

import { CreateAccountUseCase } from "../../domain/usecases/create_account.usecase";
import { AccountDto } from "../../domain/dtos/account.dto";

export class CreateAccountController {
    async handle(request: Request, response: Response) {
        try {
            const {
                username,
                firstName,
                lastName,
                email,
                password,
            } = request.body;

            const useCase = new CreateAccountUseCase();
            const result = await useCase.run(
                new AccountDto(
                    username.trim(),
                    firstName.trim(),
                    lastName.trim(),
                    email.trim(),
                    password.trim(),
                ),
            );

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
