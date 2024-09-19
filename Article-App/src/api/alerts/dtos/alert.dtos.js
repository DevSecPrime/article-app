import Joi from "joi";

// Time format regex for HH:MM
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

const alertSchema = Joi.object({
    day: Joi.string().valid(
        "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"
    ).required().messages({
        "string.empty": "Day is empty.",
        "any.only": "Invalid day.",
        "any.required": "Day is required."
    }),
    time: Joi.string().pattern(timeRegex).required().messages({
        "string.pattern.base": "Time must be in HH:MM format.",
        "any.required": "Time is required."
    })
});

export default alertSchema;
