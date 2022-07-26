import { Server } from './core/presentation/server/index';
import { DatabaseConnection, RedisConnection } from './core/infra/database/connections';

import 'dotenv/config';

DatabaseConnection.getInstance().then(() => {
    RedisConnection.initialize();
    Server.initialize();
});
