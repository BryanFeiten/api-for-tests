
require('dotenv').config();

let config = {};

const enviroment = process.env.NODE_ENV.toLowerCase();

switch (enviroment) {
    case 'production':
        config = {
            type: process.env.DATABASE_TYPE,
            url: process.env.DATABASE_URI,
            logging: false,
            extra: {
                ssl: {
                    rejectUnauthorized: false
                }
            },
            entities: ['dist/core/infra/database/entities/*.ts'],
            migrations: ['dist/core/infra/database/migrations/*.ts'],
            cli: {
                entitiesDir: "dist/core/infra/database/entities",
                migrationsDir: "dist/core/infra/database/migrations",
            },
        };
        break;

    case 'test':
        config = {
            type: 'sqlite',
            database: './test-database.sql',
            migrations: ['src/database/migrations/**/*'],
            entities: ['src/database/entities/**/*']
        };
        break;

    default:
        config = {
            type: process.env.DATABASE_TYPE,
            url: process.env.DATABASE_URI,
            logging: false,
            extra: {
                ssl: {
                    rejectUnauthorized: false
                }
            },
            entities: ['src/core/infra/database/entities/*.ts'],
            migrations: ['src/core/infra/database/migrations/*.ts'],
            cli: {
                entitiesDir: "src/core/infra/database/entities",
                migrationsDir: "src/core/infra/database/migrations",
            },
        };
}

module.exports = config;