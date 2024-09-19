import { HTTP_STATUS_CODE } from "../../comman/constants";
import NotFoundException from "../../comman/exceptions/notFoundExceptions";
import userService from "../auth/auth.service";
import otpVrificationService from "./otp-vrification.service";
import UserModel from "../../models/user.model";
class OTPController {
    // /**
    //  * Send OTP
    //  * @param {object} req 
    //  * @param {object} res 
    //  * @param {*} next 
    //  * @returns 
    //  */
    // async sendOTP(req, res, next) {
    //     try {
    //         //get number form req.body
    //         const { countryCode, phoneNo } = req.body
        
          

    //         //check if number is exist or not 
    //         const user = await userService.findOne(countryCode,phoneNo);
    //         if (!user) {
    //             throw new NotFoundException("User does not exist.")
    //         }
    //         //generate otp
    //         const otp = await otpVrificationService.generateOtp();


    //         //uupdate in user databse
    //         const updatedUser = await otpVrificationService.updateUser(phoneNo, otp);

    //         //send response
    //         return res
    //             .status(200)
    //             .json({
    //                 status: HTTP_STATUS_CODE.SUCCESS,
    //                 data: new UserModel(updatedUser),
    //                 message: "OTP sent successfully."
    //             })
    //     } catch (error) {
    //         return next(error);
    //     }
    // }

    /**
     * Verify OTP
     * @param {object} req 
     * @param {object} res 
     * @param {object} next 
     * @returns 
     */
    async verifyOTP(req, res, next) {
        try {
            //get phone number and otp from req.body
            const { countryCode,phoneNo, otp } = req.body;

            //get user based on phone number
            const user = await userService.findOne(countryCode,phoneNo);
            if (!user) {
                throw new NotFoundException("Invalid user.")
            }

            //verify OTP
            await otpVrificationService.verifyOTP(user.id, otp);

            //send response
            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .json({
                    status: HTTP_STATUS_CODE.SUCCESS,
                    data: new UserModel(user),
                    message: "Otp verified successfully."
                })

        } catch (error) {
            return next(error);
        }
    }
}
export default new OTPController();