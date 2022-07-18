import {
    Request,
    Response
} from "express";

import { DeleteAccountUseCase } from "../../domain/usecases/delete_account.usecase";

export class DeleteAccountController {
    async handle(request: Request, response: Response) {
        try {
            const {
                accountUid,
                password,
            } = request.body;

            const useCase = new DeleteAccountUseCase();

            await useCase.run(accountUid, password);

            return response.status(200).send({
                success: true,
                data: true,
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
