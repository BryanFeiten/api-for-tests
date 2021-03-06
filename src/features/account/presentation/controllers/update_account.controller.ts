import {
    Request,
    Response
} from "express";

import { AccountDto } from "../../domain/dtos/account.dto";
import { UpdateAccountUseCase } from "../../domain/usecases";
import { CustomError } from "../../../../shared/presentation/errors/custom.error";

export class UpdateAccountController {
    constructor(private usecase: UpdateAccountUseCase) { }

    async handle(request: Request, response: Response) {
        const { accountUid, firstName, lastName } = request.body;

        try {
            await this.usecase.run(
                new AccountDto(accountUid, firstName.trim() ?? '', lastName.trim() ?? '', '', ''),
            );

            return response.status(200).json({
                ok: true,
                data: true,
            });
        } catch (error) {
            if (error instanceof CustomError) {
                return response.status(error.code).json({
                    success: false,
                    data: error.message,
                })
            }

            return response.status(500).json({
                ok: false,
                data: error instanceof Error
                    ? error.message
                    : "unknown",
            });
        }
    }
}
