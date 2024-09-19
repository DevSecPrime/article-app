import { HTTP_STATUS_CODE } from "../constants";
import GenerelException from "./generlException";

class UnauthorisedException extends GenerelException {
    constructor(message) {
        super();
        this.message = message || "Unauthorised";
        this.status = HTTP_STATUS_CODE.UNAUTHORISED || 401;
    }
}

export default UnauthorisedException;