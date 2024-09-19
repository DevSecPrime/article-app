import BadRequestException from "../../comman/exceptions/badRequestExceptions";
import userService from "./auth.service";
import { HTTP_STATUS_CODE } from "../../comman/constants";
import UserModel from "../../models/user.model";
import otpVrificationService from "../otp-verification/otp-vrification.service";
import moment from "moment";
import knex from "../../comman/config/db";
class UserController {
    async register(req, res, next) {
        try {
            //get data from req.body
            const { countryCode, phoneNo } = req.body;

            //check if country code is wrong
            const code = await userService.checkByCode(countryCode);
            if (!code) {
                throw new BadRequestException("Invalid country code.")
            }

            //check  user by number
            const existUser = await userService.findOne(countryCode,phoneNo);
            if (existUser) {
                throw new BadRequestException("User already registered.");
            }


            //generate OTP
            const otp = await otpVrificationService.generateOtp();
            
            //create new user
            const newUser = await userService.createUser({
                countryCode,
                phoneNo,
                otp: otp,
                otpVerifiedAt: null,
                otpExpiresAt: moment().add(10, "minutes").format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: knex.fn.now()
            });

            //generate token
            const token = await userService.generateToken(newUser.id)

            //send response
            return res
                .status(HTTP_STATUS_CODE.CREATE)
                .json({
                    status: HTTP_STATUS_CODE.CREATE,
                    data: new UserModel(newUser),
                    accessToken: token,
                    message: "User created successfully."
                })


        } catch (error) {
            return next(error);
        }
    }
}

export default new UserController();