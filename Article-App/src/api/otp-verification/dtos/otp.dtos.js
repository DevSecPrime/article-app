import joi from "joi";

export const otpSchema = joi.object({
    countryCode: joi.string().max(10).required().messages({
        "string.empty": "Country code is empty.",
        "any.required": "Country code is required.",
        "string.max": "Invalid country code.",
    }),
    phoneNo: joi.string().required().min(10).max(20).pattern(/^[0-9]+$/).messages({
        "string.empty": "Phone number is empty",
        "string.max": "Invalid phone number.",
        "string.min": "Invalid phone number.",
        "string.pattern.base": "Plase, enter valid phone number.",
        "any.required": "Phone number is required."
    }),
    otp: joi.number().optional().messages({
        "number.base": "OTP is not valid.",
        "number.empty": "OTP is required."
    })

})