import {
    Request,
    Response
} from "express";

import { DeleteAccountUseCase } from "../../domain/usecases";
import { CustomError } from "../../../../shared/presentation/errors/custom.error";

export class DeleteAccountController {
    constructor(private usecase: DeleteAccountUseCase) {}

    async handle(request: Request, response: Response) {
        try {
            const {
                accountUid,
                password,
            } = request.body;

            await this.usecase.run(accountUid, password);

            return response.status(200).json({
                success: true,
                data: true,
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
