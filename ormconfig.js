const env = process.env.NODE_ENV === "production" ? "dist" : "src";

module.exports = {
    type: "sqlite",
    database: "db.sqlite3",
    entities: [`${env}/core/infra/database/entities/*.ts`],
    migrations: [`${env}/core/infra/database/migrations/*.ts`],
    logging: false,
    synchronize: false,
    cli: {
        entitiesDir: "src/core/infra/database/entities",
        migrationsDir: "src/core/infra/database/migrations",
    },
};
