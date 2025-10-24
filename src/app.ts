import express, { type NextFunction, type Request, type Response } from 'express';
import cors from 'cors';
import compression from 'compression';
import router from './router';
import globalErrorHandler from './middleware/globalErrorHandler';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import "./config/passport";
import session from 'express-session';
import { envVars } from './envConfig/env';

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(compression())
app.use(
    cors(
        {
            origin: ["http://localhost:3000", "https://bulbul-ahammed.vercel.app"],
            credentials: true
        }
    )
);

app.use(session({
    secret: envVars.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: "none"
    }
}))

app.use(passport.initialize())
app.use(passport.session())

// Default route for testing
app.get("/", (req: Request, res: Response) => {
    res.send("Server is running");
});

app.use('/api/v1', router)
app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found",
    });
});

export default app;