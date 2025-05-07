import { Router } from 'express';
import menuRouter from './users.routes';

const router = Router();

router.use('/users', menuRouter);

export { router as routes };
