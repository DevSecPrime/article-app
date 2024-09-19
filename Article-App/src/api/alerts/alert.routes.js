import express from "express";
import validator from "../../comman/config/validation";
import expressAsyncHandler from "express-async-handler";
import alertControler from "../../api/alerts/alert.controller";
import alertSchema from "./dtos/alert.dtos"
import authMiddleware from "../../comman/middleware/auth.middleware";

const router = express.Router();
router.post("/set",
    authMiddleware,
    validator.body(alertSchema),
    expressAsyncHandler(alertControler.setAlert)
)

router.get("/get",
    authMiddleware,
    expressAsyncHandler(alertControler.checkAlert)
)
export default router;