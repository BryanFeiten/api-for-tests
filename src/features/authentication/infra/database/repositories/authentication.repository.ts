import {
    getRepository,
    Repository,
} from "typeorm";
import { compare } from 'bcrypt';

import '../../../../../shared/utils';
import { AccountEntity } from "../../../../../core/infra/database/entities/account";

export class AuthenticationRepository {
    private _repository: Repository<AccountEntity>;

    constructor() {
        this._repository = getRepository(AccountEntity);
    }

    async getAccountByEmail(email: string): Promise<string> {
        const user = await this._repository.findOne({
            where: {
                email: email,
            }
        });

        if (!user) return '';

        return user.uid;
    }

    async validatePassword(userUid: string, password: string): Promise<boolean> {
        const account = await this._repository.findOne(userUid);

        if (!account) return false;

        return await compare(password, account.password);
    }
}
