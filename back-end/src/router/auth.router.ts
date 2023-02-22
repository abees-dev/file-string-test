import { Router } from 'express';
import authController from 'src/controller/auth.controller';
import { auththentication } from 'src/middleware/authentication';

const router = Router();
router.post('/login', authController.login.bind(authController));
router.post('/register', authController.register.bind(authController));
router.post('/logout', auththentication, authController.logout.bind(authController));
router.post('/refresh-token', authController.refreshToken.bind(authController));
router.post('/verify-email', authController.verifyEmail.bind(authController));

export default router;
