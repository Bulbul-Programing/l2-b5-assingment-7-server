import passport, { type Profile } from "passport";
import { Strategy as GoogleStrategy, type VerifyCallback } from 'passport-google-oauth20';
import { envVars } from "../envConfig/env";
import { prisma } from "./db";

passport.use(
    new GoogleStrategy({
        clientID: envVars.GOOGLE_CLIENT_ID,
        clientSecret: envVars.GOOGLE_CLIENT_SECRET,
        callbackURL: envVars.GOOGLE_CALLBACK_URL
    }, async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
        try {
            const email = profile.emails?.[0]?.value

            if (!email) {
                return done(null, false, { message: 'Email Not Found!' })
            }

            let isUserExist = await prisma.user.findFirst({
                where: {
                    email: profile.emails?.[0]?.value as string
                }
            })

            if (!isUserExist) {
                isUserExist = await prisma.user.create({
                    data: {
                        email: profile.emails?.[0]?.value as string,
                        name: profile.displayName,
                    }
                })
            }

            return done(null, isUserExist)

        } catch (error) {
            console.log("Google Strategy Error", error);
            return done(error)
        }
    })
)

passport.serializeUser((user: any, done) => {
    done(null, user.id)
});

passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(id) }
        });

        done(null, user);
    } catch (error) {
        console.error("Deserialize error:", error);
        done(error);
    }
});