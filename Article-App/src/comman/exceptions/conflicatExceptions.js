import GenerelException from "./generlException";
import { HTTP_STATUS_CODE } from "../constants";
class ConflictException extends GenerelException {
    constructor(message) {
        super();
        this.message = message || "Conflict";
        this.status = HTTP_STATUS_CODE.CONFLICT || 409
    }
}

export default ConflictException;