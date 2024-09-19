import knex from "../../comman/config/db"
import moment from "moment";
import BadRequestException from "../../comman/exceptions/badRequestExceptions";
class AlertService {
    /**
     * Set alert
     * @param {int} userId 
     * @param {string} day 
     * @param {string} time 
     * @returns 
     */
    async setAlert(userId, day, time) {
        const currentTime = moment().format("YYYY-MM-DD");
        const alertTime = `${currentTime} ${time}`;
        const [id] = await knex("alerts").insert({
            userId,
            day,
            time: moment(alertTime).format("YYYY-MM-DD HH:mm:ss")
        })

        return await knex("alerts").where("id", id).first();
    }

    /**
     * Find alert based in day
     * @param {int} userId 
     * @param {string} day 
     * @returns 
     */
    async findByDay(userId, day) {
        return await knex("alerts")
            .where("userId", userId)
            .andWhere("day", day)
            .first();
    }
    /**
     * 
     * @param {int} userId 
     * @param {string} today 
     * @param {string} time 
     * @returns 
     */
    async getAlert(userId, today, time) {
        try {
            // console.log("User id", userId);
            // console.log("Today", today);
            // console.log("Time", time);

            const alert = await knex("alerts")
                .where("userId", userId)
                .andWhere("day", today)
                .andWhere("time", time)
                .first();

            // const currentTime = "2024-09-06 14:00:00";
            const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
            console.log("Current time", currentTime);
            if (time == currentTime) {
                return knex("alerts").where("userId", userId)
                    .update({
                        message: "Alert is on."
                    })
            }
            else {
                throw new BadRequestException("Alert is off.");
            }
        } catch (error) {
            console.log("Error-", error);
        }
    }
}
export default new AlertService();