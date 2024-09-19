import { HTTP_STATUS_CODE } from "../constants";
import GenerelException from "./generlException";

class UnProcessibleExceptions extends GenerelException {
    constructor(message) {
        super();
        this.message = message || "Unprocessible entity";
        this.status = HTTP_STATUS_CODE.UNPROCESSIBLE || 422;
    }
}

export default UnProcessibleExceptions