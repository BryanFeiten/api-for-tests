import { Connection, createConnection } from "typeorm";

export class DatabaseConnection {
    private static instance: Connection;

    static async getInstance() {
        if (!DatabaseConnection.instance) {
            const database = new DatabaseConnection();
            DatabaseConnection.instance = await database.openConnection();
        }

        console.log('Database is connected')

        return DatabaseConnection.instance;
    }

    private async openConnection() {
        try {
            return await createConnection();
        } catch (error) {
            throw new Error(`Erro ao conectar no banco: ${error}`);
        }
    }
}