import joi from "joi";

export const userSchema = joi.object({
    countryCode: joi.string().required().max(10).messages({
        "string.empty": "Country code is empty.",
        "string.max": "Please, enter valid country code.",
        "any.required": "Country code is required."
    }),

    phoneNo: joi.string().required().min(10).max(20).pattern(/^[0-9]+$/).messages({
        "string.empty": "Phone number is empty",
        "string.max": "Invalid phone number.",
        "string.min": "Invalid phone number.",
        "string.pattern.base": "Plase, enter valid phone number.",
        "any.required": "Phone number is required."
    })
})