import { HTTP_STATUS_CODE } from "../constants"
import GeneralException from "../exceptions/generlException"

export default (err, req, res, next) => {
    // console.log("Error captured.", err);

    // General exception
    if (err instanceof GeneralException) {
        return res
            .status(err.status || HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
            .json({
                success: false,
                status: err.status || HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
                message: err.message || "Something went wrong",
            });
    }

    // Joi validation error
    if (err && err.error && err.error.isJoi) {
        if (err.error.details[0]) {
            return res
                .status(HTTP_STATUS_CODE.UNPROCESSIBLE)
                .json({
                    success: false,
                    status: HTTP_STATUS_CODE.UNPROCESSIBLE,
                    message: err.error.details[0].message,
                });
        }
    }

    // Other errors with status code
    if (err && err.statusCode) {
        return res
            .status(err.statusCode)
            .json({
                success: false,
                status: err.statusCode,
                message: err.message || "Error.",
            });
    }

    // Internal server error
    return res
        .status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
        .json({
            success: false,
            status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
            error: err && err.message
                ? err.message
                : "Something went wrong or Internal server error.",
            message: "Something went wrong.",
        });
}
