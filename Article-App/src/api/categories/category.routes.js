//import express from express
import express from "express";
import validator from "../../comman/config/validation";//import validation
import { categorySchema,updateCategorySchema } from "./dtos/category.dtos"
import expressAsyncHandler from "express-async-handler";//import expressAsyncHandler
import categoryController from "./category.controller";//import categoryController



const router = express.Router();

//define routes
router.post("/create",
    validator.body(categorySchema),
    expressAsyncHandler(categoryController.createCategory)
)

router.put("/update/:id",
    validator.body(updateCategorySchema),
    expressAsyncHandler(categoryController.updateCategory)
)

router.delete("/delete/:id",
    expressAsyncHandler(categoryController.deleteCategory)
)
router.get("/list",
    expressAsyncHandler(categoryController.getAllCategories)
)
//export routes
export default router;