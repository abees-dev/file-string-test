import { Router } from 'express';
import authRouter from './auth.router';
import userRouter from './user.router';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);

export default router;
