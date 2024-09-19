import moment from "moment";
import knex from "../../comman/config/db";
import BadRequestException from "../../comman/exceptions/badRequestExceptions";
import UnauthorisedException from "../../comman/exceptions/unAuthorizedException";

class OTPService {
    async generateOtp() {
        // const user = await knex("users").where("phoneNo", phoneNo).first();
        // if (user) {
        //     throw new BadRequestException("User already registered.");
        // }
        //generate OTP
        let otp;
        let result;
        do {
            otp = Math.floor(Math.random() * (999999 - 100000)) + 100000;
            result = await knex("users").where("otp", otp).first();
        }
        while (result > 0)
        return otp;
    }

    /**
     * Send OTP
     * @param {int} phoneNo 
     * @param {int} otp 
     * @returns 
     */
    async updateUser(phoneNo, otp) {
        await knex("users").where("phoneNo", phoneNo).update({
            otp: otp,
            otpVerifiedAt: null,
            otpExpiresAt: moment().add(10, "minutes").format("YYYY-MM-DD HH:mm:ss"),
            updatedAt: knex.fn.now()
        })  

        return await knex("users").where("phoneNo", phoneNo).first();
    }

    async verifyOTP(userId, otp) {
        const checkOTP = await knex("users")
            .where("id", userId)
            .andWhere("otp", otp)
            .first();

        if (!checkOTP) {
            throw new UnauthorisedException("Invalid OTP");
        }

        const currTime = moment().unix();
        const otpExpiresUnix = moment(checkOTP.otpExpiresAt).unix();
        if (otpExpiresUnix < currTime) {
            throw new UnauthorisedException("OTP is expired.")
        }

        //update otp current time
        await knex("users")
            .where("id", userId)
            .update({
                otpVerifiedAt: knex.fn.now(),
                updatedAt: knex.fn.now()
            })
        // Return the updated user for further processing
        return await knex("users").where("id", userId).first();
    }
}
export default new OTPService();