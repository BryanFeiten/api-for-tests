import { Column, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { IUser } from "../../../../features/user/domain/contracts/user";

@Entity()
export class User implements IUser {
    @PrimaryColumn({
        length: 50,
    })
    username: string;

    @Column({
        length: 50,
    })
    name: string;

    @Column({
        length: 30,
    })
    password: string;

    @Column({
        length: 50,
        nullable: true,
    })
    city?: string;

    @UpdateDateColumn()
    updatedAt: Date;
}
