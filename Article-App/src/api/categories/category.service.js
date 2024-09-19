import knex from "../../comman/config/db";
import { DEFAULT_PAGE, DEFAULT_LIMIT } from "../../comman/constants";
import NOTFoundException from "../../comman/exceptions/notFoundExceptions"

class CategoryService {

    async findById(categoryId) {
        return await knex("category")
            .where("id", categoryId)
            .first()
    }

    /**
     * Find category by name
     * @param {string} name 
     * @returns 
     */
    async findByCategoryName(name) {
        return await knex("category")
            .whereRaw("LOWER(categoryName) = ?", name.toLowerCase())
            .first()
    }

    /**
     * Check by category name
     * @param {string} name 
     * @param {int} id 
     * @returns 
     */
    async checkByCategory(name, id) {
        return await knex("category")
            .whereRaw("LOWER(categoryName) = ?", name.toLowerCase())
            .andWhere("id", "!=", id)
            .first()
    }

    /**
     * Create new category
     * @param {object} catDtos 
     * @returns 
     */
    async createCategory(catDtos) {
        const [id] = await knex("category")
            .insert(catDtos);

        return await knex("category").where("id", id).first();
    }

    async updateCategory(categoryId, catDtos) {
        await knex("category").where("id", categoryId).update({
            categoryName: catDtos.categoryName,
            color: catDtos.color,
            updatedAt: knex.fn.now()
        })

        return await this.findById(categoryId)
    }

    async deleteCategory(categoryId) {
        return await knex("category")
            .where("id", categoryId)
            .del();
    }
    /**
     * Find by search
     * @param {string} search 
     * @returns 
     */
    async findBySearch(search = "") {
        return await knex("category")
            .where("categoryName", "like", `%${search}%`)
            .select("*")
    }
    /**
     * Get all categories
     * @param {number} page 
     * @param {number} perPage 
     * @param {string} search 
     * @returns 
     */
    async getAllCategories(page = DEFAULT_PAGE, perPage = DEFAULT_LIMIT, search = "") {
        if (page < DEFAULT_PAGE || page == 0) {
            throw new NOTFoundException("Invalid page number")
        }

        return await knex("category")
            .whereRaw("LOWER(categoryName) like ?", `%${search.toString().toLowerCase()}%`)
            .select("*")
            .paginate({
                perPage,
                currentPage: page,
                isLengthAware: true
            })
    }
}

export default new CategoryService();