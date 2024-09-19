import knex from "../../comman/config/db";
import BadRequestException from "../../comman/exceptions/badRequestExceptions";
import NotFoundException from "../../comman/exceptions/notFoundExceptions";
import accessTokenService from "../access_token/access.token.service";

class UserService {

    /**
     * Find by country code
     * @param {string} countryCode 
     * @returns 
     */

    async checkByCode(countryCode) {
        return await knex("users")
            .where("countryCode", countryCode)
            .first();
    }

    /**
     * Find user vis phone number 
     * @param {int}phoneNumber 
     * @returns 
     */
    async findOne(countryCode, phoneNumber) {
        return await knex("users")
            .where("countryCode", countryCode)
            .andWhere("phoneNo", phoneNumber)
            .first()
    }

    /**
     * Find by OTP
     * @param {int} otp 
     * @returns 
     */
    async findByOTP(otp) {
        return await knex("users")
            .where("otp", otp)
            .first()
    }

    /**
     * Carete new user
     * @param {object} userDtos 
     * @returns 
     */
    async createUser(userDtos) {
        const [id] = await knex("users").insert(userDtos);
        return await knex("users").where("id", id).first();
    }

    async generateToken(userId) {
        return await accessTokenService.createToken(userId)
    }
}

export default new UserService();