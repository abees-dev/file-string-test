import { Router } from 'express';
import userController from 'src/controller/user.controller';
import { auththentication } from 'src/middleware/authentication';

const router = Router();
router.post('/update', auththentication, userController.update.bind(userController));

export default router;
