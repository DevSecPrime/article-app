import moment from "moment";
export default class FavouriteArticlesModel {
    constructor(data) {
        this.favId = data.id;
        this.userId = data.userId;
        this.articleId = data.articleId;
        this.articleTitle = data.title;
        this.articleAuther = data.author;
        this.articleSummary = data.summary;
        this.articleSummary = data.publishedYear;
        this.updatedAt = moment().unix();
    }
}
