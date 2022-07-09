import { UpdateUserUseCase } from "../../domain/usecases/update_user.usecase";
import { Request, Response } from "express";
import { GetUserUseCase } from "../../domain/usecases/get_user.usecase";
import { UserDto } from "../../domain/dto/user.dto";

export class UpdateUserController {
    async handle(request: Request, response: Response) {
        try {
            const { userUid, firstName, lastName } = request.body;

            const useCase = new UpdateUserUseCase();
            await useCase.run(
                new UserDto(userUid, firstName.trim(), lastName.trim(), '', ''),
            );

            return response.status(200).send({
                ok: true,
                data: true,
            });
        } catch (error) {
            return response.status(500).send({
                ok: false,
                data: error instanceof Error
                    ? error.message
                    : "unknown",
            });
        }
    }
}
