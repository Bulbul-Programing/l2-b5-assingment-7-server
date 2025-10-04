import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join((process.cwd(), '.env')) })

export default {
    NODE_ENV: process.env.NODE_ENV,
    port: process.env.PORT,
    bcryptSaltRounds: process.env.BCRYPT_ROUNDS,
    database_url: process.env.DATABASE_URL,
    accessTokenSecrete: process.env.ACCESS_TOKEN_SECRETE,
    resetPasswordSecrete: process.env.RESET_PASSWORD_SECRETE,
    emailVerifySecrete: process.env.EMAIL_VERIFIED_SECRET,
    accessTokenExpire: process.env.ACCESS_TOKEN_EXPIRE,
    refreshTokenExpire: process.env.REFRESH_TOKEN_EXPIRE,
}
