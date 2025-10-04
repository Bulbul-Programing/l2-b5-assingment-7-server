import express from 'express';
import { userController } from './user.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { userValidationSchema } from './user.validation';

const router = express.Router()

router.post('/create', validateRequest(userValidationSchema), userController.createNewUser)
router.get('/all-users', userController.getAllUser)
router.get('/:id', userController.getSingleUser)
router.delete('/:id', userController.deleteUser)

export const userRouter = router