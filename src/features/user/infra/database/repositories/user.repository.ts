import { getRepository, Repository } from "typeorm";
import { UserEntity } from "../../../../../core/infra/database/entities/user";
import { UserDto } from "../../../domain/dto/user.dto";


export class UserRepository {
    private _repository: Repository<UserEntity>;

    constructor() {
        this._repository = getRepository(UserEntity);
    }

    async create(user: UserDto): Promise<boolean> {
        const userInstance = this._repository.create(user);
        const created = !!await this._repository.save(userInstance);

        return created;
    }

    async getByEmail(email: string): Promise<boolean> {
        return !!(await this._repository.findOne({
            where: {
                email: email,
            }
        }));
    }


    async getByUsername(username: string): Promise<UserEntity> {
        return await this._repository.findOneOrFail({
            where: {
                username: username,
            }
        });
    }

    async getByUid(uid: string): Promise<UserEntity> {
        const user = await this._repository.findOneOrFail(uid);

        return user;
    }

    async list(): Promise<UserEntity[]> {
        const users = await this._repository.find();

        return users;
    }

    async delete(uid: string): Promise<boolean> {
        const deleted = !!await this._repository.delete(uid);

        return deleted;
    }

    async update(user: UserDto, actualUser: UserEntity): Promise<boolean> {
        actualUser.firstName = user.firstName && user.firstName.isNotEmpty() ? user.firstName : actualUser.firstName;
        actualUser.firstName = user.lastName && user.lastName.isNotEmpty() ? user.lastName : actualUser.lastName;
        actualUser.lastName = user.lastName ?? actualUser.lastName;

        const updated = !!await this._repository.save(actualUser);

        return updated;
    }
}
