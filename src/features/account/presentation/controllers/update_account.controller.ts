import {
    Request,
    Response
} from "express";

import { AccountDto } from "../../domain/dtos/account.dto";
import { UpdateAccountUseCase } from "../../domain/usecases";
import { CustomError } from "../../../../shared/presentation/errors/custom.error";

export class UpdateAccountController {
    async handle(request: Request, response: Response) {
        const { accountUid, firstName, lastName } = request.body;

        try {
            const useCase = new UpdateAccountUseCase();
            await useCase.run(
                new AccountDto(accountUid, firstName.trim() ?? '', lastName.trim() ?? '', '', ''),
            );

            return response.status(200).send({
                ok: true,
                data: true,
            });
        } catch (error) {
            if (error instanceof CustomError) {
                return response.status(error.code).send({
                    success: false,
                    data: error.message,
                })
            }

            return response.status(500).send({
                ok: false,
                data: error instanceof Error
                    ? error.message
                    : "unknown",
            });
        }
    }
}
