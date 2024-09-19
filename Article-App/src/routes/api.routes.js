import express from "express";
import categoryRouter from "../api/categories/category.routes"
import articleRouter from "../api/articles/article.routes"
import authRoutes from "../api/auth/auth.routes"
import otpVerificationRoute from "../api/otp-verification/otp-verification.route"
import favouriteArticle from "../api/favourites/favourites.routes"
import alertRouter from "../api/alerts/alert.routes"
const router = express.Router();

router.use("/category", categoryRouter);
router.use("/article", articleRouter);
router.use("/auth", authRoutes),
    router.use("/otp", otpVerificationRoute)
router.use("/favourites", favouriteArticle)
router.use("/alerts", alertRouter);

export default router;