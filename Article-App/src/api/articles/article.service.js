import knex from "../../comman/config/db";
import { DEFAULT_PAGE, DEFAULT_LIMIT } from "../../comman/constants";
import BadRequestException from "../../comman/exceptions/badRequestExceptions";
class ArticleService {
    /**
     * Find article by id
     * @param {int} id 
     * @returns 
     */
    async findById(id) {
        return await knex("category")
            .where("id", id)
            .first();
    }

    /**
     * Find article by title
     * @param {string} title 
     * @returns 
     */

    async findByTitle(title) {
        return await knex("articles")
            .where("title", title)
            .first();
    }
    /**
     * Get Article By Id
     * @param {int} articleId 
     * @param {int} categoryId 
     * @returns 
     */
    async getByArticleId(id, categoryId) {

        return await knex("articles")
            .where("id", id)
            .andWhere("categoryId", categoryId)
            .first()
    }
    /**
     * Check by article Id
     * @param {int} articleId 
     * @param {string} title 
     * @returns 
     */
    
    async checkArticleId(title, articleId) {
        console.log("articleId", articleId);
        console.log("title", title);

        return await knex("articles")
            .whereRaw("LOWER(title) = ?", title.toLowerCase())
            .andWhere("id", "!=", articleId) // Ensure it doesn't match the current article ID
            .first();
    }

    /**
     * Update Article
     * @param {int} id 
     * @param {object} articleDtos 
     * @returns 
     */
    async updateArticle(id, articleDtos) {
        await knex("articles")
            .where("id", id)
            .update({
                title: articleDtos.title,
                author: articleDtos.author,
                summary: articleDtos.summary,
                publishedYear: articleDtos.publishedYear,
                abstract: articleDtos.abstract,
                link: articleDtos.link,
                journal: articleDtos.journal
            })

        return await knex("articles").where("id", id).first();
    }

    /**
     * Create new category
     * @param {object} articleDtos 
     * @returns 
     */
    async createArticle(articleDtos) {
        const [id] = await knex("articles").insert(articleDtos);
        return await knex("articles").where("id", id).first();
    }

    /**
     * Find Article by Id
     * @param {int} id 
     * @returns 
     */
    async findByArticleId(id) {
        const result = await knex("articles")
            .join("category", "articles.categoryId", "=", "category.id")
            .where("articles.id", id)
            .select(
                "articles.*",
                "category.categoryName as category_name",
                "category.color as category_color"
            )
            .first();

        return result;
    };

    /**
     * Find by category id
     * @param {int} id  
     * @returns
     */
    async findByCategoryId(id) {
        return await knex("articles")
            .where("categoryId", id)
            .first()
    }


    async findMany(id, page = DEFAULT_PAGE, perPage = DEFAULT_LIMIT, search = "") {
        if (page === 0 || page < DEFAULT_PAGE) {
            throw new BadRequestException("Invalid page number");
        }

        const result = await knex("articles")
            .join("category", "articles.categoryId", "=", "category.id")
            .where("articles.categoryId", id)
            .whereRaw("LOWER(articles.title) LIKE ?", [`%${search.toString().toLowerCase()}%`])
            .select("articles.*", "category.categoryName as category_name", "category.color as category_color")
            .paginate({
                perPage,
                currentPage: page,
                isLengthAware: true,
            });

        // console.log("Result:-", result);
        return result;
    }

    async deleteArticle(id) {
        return await knex("articles").where("id", id).delete();
    }

}

export default new ArticleService();
