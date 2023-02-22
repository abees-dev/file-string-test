import { Router } from 'express';
import { auththentication } from '../middleware/authentication';
import userController from '../controller/user.controller';

const router = Router();
router.post('/update', auththentication, userController.update.bind(userController));

export default router;
