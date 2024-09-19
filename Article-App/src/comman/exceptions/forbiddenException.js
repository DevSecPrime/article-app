import { HTTP_STATUS_CODE } from "../constants";
import GenerelException from "./generlException";

class ForbidenException extends GenerelException {
    constructor(message) {
        super();
        this.message = message || "Forbidden";
        this.message = HTTP_STATUS_CODE.FORBIDDEN || 403
    }
}

export default ForbidenException;