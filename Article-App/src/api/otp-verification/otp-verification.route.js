import express from "express";
import validator from "../../comman/config/validation";
import expressAsyncHandler from "express-async-handler";
import { otpSchema } from "./dtos/otp.dtos";
import otpVerificationController from "./otp-verification.controller";

const router = express.Router();

router.post("/send-otp",
    validator.body(otpSchema),
    expressAsyncHandler(otpVerificationController.sendOTP)
)

router.post("/verify",
    validator.body(otpSchema),
    expressAsyncHandler(otpVerificationController.verifyOTP)
)

export default router;