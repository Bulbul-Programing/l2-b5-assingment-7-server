import express, { type NextFunction, type Request, type Response } from 'express';
import cors from 'cors';
import compression from 'compression';
import router from './router';
import globalErrorHandler from './middleware/globalErrorHandler';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import "./config/passport";
import expressSession from 'express-session';
import { envVars } from './envConfig/env';

const app = express()

// middleware
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

app.use(expressSession({
    secret: envVars.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(compression())
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())

app.use(express.json())

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