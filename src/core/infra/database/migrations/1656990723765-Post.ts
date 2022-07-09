import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class Post1656990723765 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'post',
            columns: [
                {
                    name: 'uid',
                    type: 'varchar',
                    length: '50',
                    isPrimary: true,
                    isNullable: false,
                },
                {
                    name: 'user_uid',
                    type: 'varchar',
                    length: '50',
                    isNullable: false,
                },
                {
                    name: 'title',
                    type: 'varchar',
                    length: '50',
                    isNullable: false,
                },
                {
                    name: 'description',
                    type: 'text',
                    isNullable: false,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                    isNullable: false,
                },
            ],
            foreignKeys: [new TableForeignKey({
                columnNames: ['user_uid'],
                referencedTableName: 'user',
                referencedColumnNames: ['uid'],
            })],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('post', true, true, true)
    }

}
