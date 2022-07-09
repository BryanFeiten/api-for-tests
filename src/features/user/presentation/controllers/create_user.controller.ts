import { CreateUserUseCase } from "../../domain/usecases/create_user.usecase";
import { Request, Response } from "express";
import { UserDto } from "../../domain/dto/user.dto";

export class CreateUserController {
    async handle(request: Request, response: Response) {
        try {
            const {
                username,
                firstName,
                lastName,
                email,
                password,
            } = request.body;
    
            const useCase = new CreateUserUseCase();
            const result = await useCase.run(
                new UserDto(
                    username,
                    firstName,
                    lastName,
                    email,
                    password,
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
                message: error instanceof Error ? error.message : "unknown",
            });
        }
    }
}
