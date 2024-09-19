import express from "express";
import validator from "../../comman/config/validation";
import { userSchema } from "./dtos/auth.dtos";
import expressAsyncHandler from "express-async-handler";
import userController from "./auth.controller";

//create route instance
const router = express.Router();

//define routes
router.post("/register",
    validator.body(userSchema),
    expressAsyncHandler(userController.register)
)

///export router
export default router;