import express, { type NextFunction, type Request, type Response } from 'express';
import { authController } from './auth.controller';
import passport from 'passport';
import { envVars } from '../../envConfig/env';

const router = express.Router()

router.post('/login', authController.loginUser)


// Google Login
router.get('/google', async (req: Request, res: Response, next: NextFunction) => {
    const redirect = req.query.redirect || '/'
    passport.authenticate('google', { scope: ['profile', 'email'], state: redirect as string })(req, res, next)
})

router.get('/google/callback', passport.authenticate("google", { failureRedirect: `${envVars.FRONTEND_URL}/login?error=There is some issues with your account. Please contact with out support team!` }), authController.googleCallbackController);

export const authRouter = router