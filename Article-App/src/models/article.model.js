import moment from "moment"
export default class ArticleModel {
    constructor(data) {
        this.articleId = data.id;
        this.categoryId = data.categoryId;
        this.title = data.title;
        this.author = data.author;
        this.summary = data.summary;
        this.publishedYear = data.publishedYear;
        this.abstract = data.abstract;
        this.link = data.link;
        this.journal = data.journal;
        this.categoryName = data.category_name;
        this.categoryColor = data.category_color
        this.updatedAt = moment().unix()
    }
}