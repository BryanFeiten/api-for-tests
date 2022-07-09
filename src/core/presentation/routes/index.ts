import { UserRoutes } from '../../../features/user/presentation/routes/user.routes';

export const makeRoutes = (app: any) => {
    app.use('/users', UserRoutes.getRoutes());
};
