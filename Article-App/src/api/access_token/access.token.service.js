import knex from "../../comman/config/db";
import dotenv from "dotenv";
import jwt, { decode } from "jsonwebtoken";
import crypto from "crypto";
import moment from "moment";
dotenv.config();

class AccessTokenService {
    async createToken(userId) {
        const jti = crypto.randomBytes(32).toString("hex");

        const payload = {
            jti: jti,
            sub: userId
        }
        //generate token
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_ACCESS_EXPIRES
        })

        //decode token
        const decodeToken = jwt.decode(token);
        //store tooken in db
        await this.storToken(userId, jti, decodeToken)
        return token;
    }

    async storToken(userId, jti, decodeToken) {
        return await knex("access_token")
            .insert({
                id: jti,
                user_id: userId,
                expiresAt: moment.unix(decodeToken.exp).format("YYYY-MM-DD HH:mm:ss")
            })
    }
}

export default new AccessTokenService();