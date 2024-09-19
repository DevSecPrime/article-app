
import moment from "moment";

export default class UserModel {
    constructor(data) {
        this.userId = data.id,
            this.countryCode = data.countryCode,
            this.phoneNo = Number(data.phoneNo),
            this.otp = Number(data.otp),
            this.isOtpVerified = !!data.otpVerifiedAt,
            this.updatedAt = moment().unix()
    }
}