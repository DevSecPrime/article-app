import moment from "moment";

export default class AlertModel {
    constructor(data) {
       this.alertId = data.id;   
       this.userId = data.userId;
       this.day = data.day;
       this.time = moment(data.time).unix();
       this.upatedAt = moment(data.upatedAt).unix();

    }
}