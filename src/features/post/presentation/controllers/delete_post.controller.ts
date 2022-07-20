import {
    Request,
    Response
} from "express";

import { DeletePostUseCase } from "../../domain/usecases";
import { CustomError } from "../../../../shared/presentation/errors/custom.error";

export class DeletePostController {
    constructor(private usecase: DeletePostUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const { uid } = request.params;
            const accountUid = request.body.accountUid;

            await this.usecase.run(uid, accountUid);

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
