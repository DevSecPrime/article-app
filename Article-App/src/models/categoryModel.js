import moment from "moment";
export default class CategoryModel {
    constructor(data) {
        this.categoryId = data.id;
        this.categoryName = data.categoryName;
        this.color = data.color;
        this.updatedAt = moment().unix();
    }
}