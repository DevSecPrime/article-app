import express from "express";

const router = express.Router();

router.get("/api/changeLogs", (req, res) => {
    res.render("api/api.changeLogs.ejs")
})

export default router;