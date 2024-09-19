import express from "express";
import favouritesController from "./favourites.controller";
import authMiddleware from "../../comman/middleware/auth.middleware";


const router = express.Router();

router.post("/like/:articleId",
    authMiddleware,
    favouritesController.addLike
)

router.delete("/dislike/:likedId",
    authMiddleware,
    favouritesController.removeLike
)


router.get("/list",
    authMiddleware,
    favouritesController.getFavouriteArticles
)
export default router;