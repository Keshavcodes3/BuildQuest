import { Router } from 'express';
import userController from './users.controller.js';
import UserValidator from './users.validation.js';
import { verifyAuth } from '../../middleware/auth.middleware.js';


const router = Router();

router.post(
    '/register',
    UserValidator.validateRegister,
    userController.registerUser
);

router.post(
    '/login',
    UserValidator.validateLogin,
    userController.loginUser
);



router.post('/update',verifyAuth, userController.updateProfile)
router.post('/change-password',verifyAuth, userController.changePassword)
router.get('/me', verifyAuth, userController.getCurrentUser)


export default router;