import {
    Request,
    Response
} from "express";

import { GetAccountListUseCase } from "../../domain/usecases";

export class AccountListController {
    async handle(request: Request, response: Response) {
        try {
            const useCase = new GetAccountListUseCase();
            const result = await useCase.run();

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
