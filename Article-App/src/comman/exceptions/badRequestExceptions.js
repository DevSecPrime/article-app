import { HTTP_STATUS_CODE } from "../constants";
import GenerelException from "./generlException";

class BadRequestException extends GenerelException {
    constructor(message) {
        super();
        this.message = message || "Bad Request";
        this.status = HTTP_STATUS_CODE.BAD_REQUEST || 400;
    }
}

export default BadRequestException;