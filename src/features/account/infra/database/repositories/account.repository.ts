import {
    getRepository,
    Repository,
} from "typeorm";

import '../../../../../shared/utils';
import { AccountEntity } from "../../../../../core/infra/database/entities/account";
import { AccountDto } from "../../../domain/dtos/account.dto";

export class AccountRepository {
    private _repository: Repository<AccountEntity>;

    constructor() {
        this._repository = getRepository(AccountEntity);
    }

    async create(account: AccountDto): Promise<boolean> {
        const accountInstance = this._repository.create(account);
        const accountCreated = !!await this._repository.save(accountInstance);

        return accountCreated;
    }

    async getByEmail(email: string): Promise<boolean> {
        return !!(await this._repository.findOne({
            where: {
                email: email,
            }
        }));
    }


    async getByUsername(username: string): Promise<AccountEntity> {
        return await this._repository.findOneOrFail({
            where: {
                username: username,
            }
        });
    }

    async getByUid(uid: string): Promise<AccountEntity> {
        const account = await this._repository.findOneOrFail(uid);

        return account;
    }

    async list(): Promise<AccountEntity[]> {
        const accountList = await this._repository.find();

        return accountList;
    }

    async delete(uid: string): Promise<boolean> {
        const deleted = !!await this._repository.delete(uid);

        return deleted;
    }

    async update(
        account: AccountDto,
        actualAccount: AccountEntity,
    ): Promise<boolean> {
        actualAccount.firstName = account.firstName.isNotEmpty() ? account.firstName : actualAccount.firstName;
        actualAccount.lastName = account.lastName.isNotEmpty() ? account.lastName : actualAccount.lastName;

        const accountUpdated = !!await this._repository.save(actualAccount);

        return accountUpdated;
    }
}
