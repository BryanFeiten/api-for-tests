import { Server } from './core/presentation/server/index';
import { DatabaseConnection } from './core/infra/database/connections/database.connection';

import 'dotenv/config';
import { RedisConnection } from './core/infra/database/connections/redis.connection';

DatabaseConnection.getInstance().then(() => {
    RedisConnection.initialize();
    Server.initialize();
});
