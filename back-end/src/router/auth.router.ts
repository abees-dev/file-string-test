import { Router } from 'express';
import { auththentication } from '../middleware/authentication';
import authController from '../controller/auth.controller';

const router = Router();
router.post('/login', authController.login.bind(authController));
router.post('/register', authController.register.bind(authController));
router.post('/logout', auththentication, authController.logout.bind(authController));
router.post('/refresh-token', authController.refreshToken.bind(authController));
router.post('/verify-email', authController.verifyEmail.bind(authController));

export default router;
