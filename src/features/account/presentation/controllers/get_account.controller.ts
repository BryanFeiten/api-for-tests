import {
    Request,
    Response
} from "express";

import { GetAccountUseCase } from "../../domain/usecases";
import { CustomError } from "../../../../shared/presentation/errors/custom.error";

export class GetAccountController {
    async handle(request: Request, response: Response) {
        const { username } = request.params;
        const useCase = new GetAccountUseCase();

        try {
            const result = await useCase.run(username);

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
