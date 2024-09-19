import express from "express";//import express instance
import dotenv from "dotenv"//import dot env
import db from "./src/comman/config/db"//import database file
import webRoute from "./src/routes/web.api.routes"//import web api routes
import path from "path";//path module
import swaggerConfig from "./src/comman/config/swagger.config"//import swagger config file
import apiRouter from "./src/routes/api.routes"//import api routes
import errorHandlerMiddleware from "./src/comman/middleware/error.Handler.MiddleWare"//import error handler
import passport from "passport";
import "./src/comman/passport/jwt.strategy"

dotenv.config();
const PORT = process.env.PORT || 4000;
//create app instance
const app = express();
app.use(express.json());//use 

//server static public path
app.use(express.static(path.join(__dirname, "public")));//never forget prvide the static whenever u are using ejs

//connect with database
//check if database is coinnectd or not
const checkConnection = async () => {
    try {
        await db.raw("select 1+1 as result")
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Error while conectioning to database", error);
    }
}
checkConnection();

//initialize passport
app.use(passport.initialize());//initialize passport

//import ejs engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

//use routes
app.use("/api/v1", apiRouter)
app.use("/", webRoute);
app.use("/api/documentation", swaggerConfig);
app.use(errorHandlerMiddleware)

//define port
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})