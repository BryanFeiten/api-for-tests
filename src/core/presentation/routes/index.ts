import { AccountRoutes } from '../../../features/account/presentation/routes/account.routes';
import { PostRoutes } from '../../../features/post/presentation/routes/post.routes';

export const makeRoutes = (app: any) => {
    app.use('/account', AccountRoutes.getRoutes());
    app.use('/post', PostRoutes.getRoutes());
};
