import express from 'express';
import { userController } from './user.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { userValidationSchema } from './user.validation';
import verifyToken from '../../middleware/verifyToken';

const router = express.Router()

router.post('/create', validateRequest(userValidationSchema), userController.createNewUser)
router.get('/all-users', userController.getAllUser)
router.get('/me', verifyToken('USER', 'ADMIN', 'OWNER'), userController.getSingleUser)
router.delete('/:id', userController.deleteUser)

export const userRouter = router