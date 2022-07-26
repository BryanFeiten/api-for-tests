import "dotenv/config";
import ioredis, { Redis } from "ioredis";

export class RedisConnection {
    private static connection: Redis;

    static initialize() {
        if (!this.connection) {
            this.connection = new ioredis(
                process.env.REDIS_PORT as string, {
                host: process.env.REDIS_HOST,
                password: process.env.REDIS_PASSWORD,
                username: process.env.REDIS_USERNAME,
            });
        }

        console.log("Redis is connected.");
    }

    static getConnection() {
        if (!this.connection) {
            throw new Error("Redis is not connected");
        }

        return this.connection;
    }
}
