import { AccountRoutes } from '../../../features/account/presentation/routes/account.routes';
import { SignInRoutes } from '../../../features/authentication/presentation/routes/sign_in.routes';
import { PostRoutes } from '../../../features/post/presentation/routes/post.routes';

export const makeRoutes = (app: any) => {
    app.use('/auth', SignInRoutes.getRoutes());
    app.use('/account', AccountRoutes.getRoutes());
    app.use('/post', PostRoutes.getRoutes());
};
