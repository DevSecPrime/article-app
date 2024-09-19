import { HTTP_STATUS_CODE } from "../constants";
import GenerelException from "./generlException";

class NotFoundException extends GenerelException {
    constructor(message) {
        super();
        this.message = message || "Not found";
        this.status = HTTP_STATUS_CODE.NOT_FOUND || 404;
    }
}

export default NotFoundException;