import { UpdateUserUseCase } from "../../domain/usecases/update_user.usecase";
import { Request, Response } from "express";
import { GetUserUseCase } from "../../domain/usecases/get_user.usecase";
import { UserDto } from "../../domain/dto/user.dto";

export class UpdateUserController {
    async handle(request: Request, response: Response) {
        try {
            const { firstName, lastName } = request.body;

            const useCase = new UpdateUserUseCase();
            await useCase.run(
                new UserDto('', firstName, lastName, '', ''),
            );

            return response.status(200).send({
                ok: true,
                message: "ok",
            });
        } catch (error) {
            return response.status(500).send({
                ok: false,
                message: error instanceof Error
                    ? error.message
                    : "unknown",
                exception: true,
            });
        }
    }
}
