import knex from "../../comman/config/db"
import ConflictException from "../../comman/exceptions/conflicatExceptions";
import { DEFAULT_PAGE, DEFAULT_LIMIT } from "../../comman/constants";

class FavouriteArticleService {
    /**
     * Find User by id
     * @param {int} id 
     * @returns 
     */
    async findById(id) {
        return await knex("users").where("id", id).first();
    }

    /**
     * Find Article by id
     * @param {int} articleId 
     * @returns 
     */
    async findByArticleId(articleId) {
        return await knex("articles").where("id", articleId).first();
    }

    /**
     * Find Liked Article by id
     * @param {int} likedArticleId 
     * @returns 
     */
    async findByLikedId(likedArticleId) {
        console.log("Liked Article Id", likedArticleId)
        return await knex("favourites").where("id", likedArticleId).first();
    }

    /**
     * Like article
     * @param {int} userId 
     * @param {int} articleId 
     * @returns 
     */
    async addLike(userId, articleId) {
        const [id] = await knex("favourites").insert({
            userId,
            articleId,
        })

        return await knex("favourites").where("id", id).first();
    }

    /**
     * Check if user liked article
     * @param {int} userId 
     * @param {int} articleId 
     * @returns 
     * 
     */

    async checkLiked(userId, articleId) {
        return knex("favourites")
            .where("userId", userId)
            .andWhere("articleId", articleId)
            .first();
    }
    /**
     * Fetch all articles       
     * @param {int} userId 
     * @param {int} page 
     * @param {int} perPage 
     * @param {string} search 
     * @returns 
     */
    async fetchAllArticles(userId, page = DEFAULT_PAGE, perPage = DEFAULT_LIMIT, search = "") {
        // Ensure page and perPage are numbers and default to valid values if needed
        const currentPage = Number(page) || DEFAULT_PAGE;
        const itemsPerPage = Number(perPage) || DEFAULT_LIMIT;
        if (currentPage < 0) {
            throw new ConflictException("Inavlid page number.")
        }
        const result = await knex("favourites")
            .leftJoin("articles", "favourites.articleId", "=", "articles.id")
            .where("favourites.userId", userId)
            .whereRaw("LOWER(articles.title) like ?", [`%${search.toString().toLowerCase()}%`])
            .select("favourites.*",
                "articles.title as title",
                "articles.author as author",
                "articles.summary as summary",
                "articles.publishedYear as publishedYear"
            )
            .paginate({
                perPage: itemsPerPage,
                currentPage: page,
                isLengthAware: true,
            })

        return result;

    }

    /**
     * Remove like from article - dislike article
     * @param {int} userId 
     * @param {int} likedId 
     * @returns 
     */
    async removeLike(userId, likedId) {
        return await knex("favourites")
            .where("id", likedId)
            .andWhere("userId", userId)
            .del();
    }
}

export default new FavouriteArticleService()