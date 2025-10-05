import express, { type NextFunction, type Request, type Response } from 'express';
import { authController } from './auth.controller';
import passport from 'passport';

const router = express.Router()

router.post('/', authController.loginUser)


// Google Login
router.get('/google', async (req: Request, res: Response, next: NextFunction) => {
    const redirect = req.query.redirect || '/'
    console.log('bulbul');
    passport.authenticate('google', { scope: ['profile', 'email'], state: redirect as string })(req, res, next)
})

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

export const authRouter = router