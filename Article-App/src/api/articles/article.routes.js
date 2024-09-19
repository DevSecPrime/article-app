import express from "express";
import validator from "../../comman/config/validation";
import { articleSchema, updateArticleSchema } from "./dtos/article.dtos"
import expressAsyncHandler from "express-async-handler";
import articleController from "./article.controller"

const router = express.Router();

router.post("/create",
    validator.body(articleSchema),
    expressAsyncHandler(articleController.createArticle)
)

router.put("/update/:id",
    validator.body(updateArticleSchema),
    expressAsyncHandler(articleController.upadteArticle)
)

router.get("/:id",
    expressAsyncHandler(articleController.singleArticle)
)

router.get("/list/:id",
    expressAsyncHandler(articleController.getAllArticles)
)

router.delete("/delete/:id",
    expressAsyncHandler(articleController.deleteArticle)
)

export default router;