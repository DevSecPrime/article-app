import moment from "moment";
import { DEFAULT_DAYS, HTTP_STATUS_CODE } from "../../comman/constants"
import alertService from "./alert.service"
import conflictException from "../../comman/exceptions/conflicatExceptions";
import AlertModel from "../../models/alert.model";
import BadRequestException from "../../comman/exceptions/badRequestExceptions";



class AlertController {

    /**
     * Set alert status
     * @param {object} req 
     * @param {object} res 
     * @param {*} next 
     * @returns 
     */

    async setAlert(req, res, next) {
        try {
            //get id from req.user
            const id = req.user.id;
            console.log("User id", id);
            //get day and time from req.body
            const { day, time } = req.body;



            //check if day is vlaid day or not
            const validDay = DEFAULT_DAYS.includes(day.toLowerCase());
            if (!validDay) {
                throw new conflictException("Day is not valid.");
            }

            //chek if day already having an alert
            const chekDay = await alertService.findByDay(id, day);
            if (chekDay) {
                throw new conflictException("Day already have an alert.");
            }
            //store in databse
            const result = await alertService.setAlert(id, day, time);

            //return response
            return res
                .status(HTTP_STATUS_CODE.CREATE)
                .json({
                    status: HTTP_STATUS_CODE.CREATE,
                    data: new AlertModel(result),
                    message: "Alert set successfully."
                })
        } catch (error) {
            return next(error);
        }

    }

    /**
     * Get alert status
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async checkAlert(req, res, next) {
        try {
            //get id from req.user
            const id = req.user.id;
            // console.log("User id", id);

            const daysOftheWeek = DEFAULT_DAYS;

            const currentDayIndex = moment().day();
            const today = daysOftheWeek[currentDayIndex - 1]

            // console.log("Today is ", today);
            // console.log("hiiii.....");

            const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
            // const currentTime = "2024-09-06 14:00:00";
            // console.log("Current time", currentTime);
            // console.log("Current day via moment", today);
            // const curDay = "thursday"
            // const curTime = "2024-09-05 04:00:00"

            const alert = await alertService.getAlert(id, today, currentTime)
            if (!alert) {
                throw new conflictException("No alert found for today.")
            }

            return res.status(HTTP_STATUS_CODE.SUCCESS).json({
                status: HTTP_STATUS_CODE.SUCCESS,
                message: "Its time to read article.",

            })
        } catch (error) {
            return next(error);
        }
    }
}
export default new AlertController()