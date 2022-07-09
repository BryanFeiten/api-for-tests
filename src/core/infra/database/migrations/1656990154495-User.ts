import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class User1656990154495 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'user',
            columns: [
                {
                    name: 'uid',
                    type: 'varchar',
                    length: '50',
                    isPrimary: true,
                    isNullable: false,
                },
                {
                    name: 'username',
                    type: 'varchar',
                    length: '30',
                    isNullable: false,
                    isUnique: true,
                },
                {
                    name: 'first_name',
                    type: 'varchar',
                    length: '30',
                    isNullable: false,
                },
                {
                    name: 'last_name',
                    type: 'varchar',
                    length: '30',
                    isNullable: false,
                },
                {
                    name: 'email',
                    type: 'varchar',
                    length: '100',
                    isNullable: false,
                    isUnique: true,
                },
                {
                    name: 'password',
                    type: 'varchar',
                    length: '75',
                    isNullable: false,
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users', true, true, true)
    }

}
