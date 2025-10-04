import express from 'express';
import { authRouter } from '../modules/auth/auth.route';
import { userRouter } from '../modules/user/user.route';
import { blogRouter } from '../modules/Blog/blog.route';

const router = express.Router()

const moduleRoutes = [
    {
        path: '/auth',
        route: authRouter
    },
    {
        path: '/user',
        route: userRouter
    },
    {
        path: '/blog',
        route: blogRouter
    }
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;