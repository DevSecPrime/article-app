import articleService from "./article.service"
import NOTFoundException from "../../comman/exceptions/notFoundExceptions"
import BadRequestException from "../../comman/exceptions/badRequestExceptions"
import ArticleModel from "../../models/article.model"
import { HTTP_STATUS_CODE, DEFAULT_PAGE, DEFAULT_LIMIT } from "../../comman/constants"
class ArticleController {
    /**
     * Create new article 
     * @param {object} req 
     * @param {object} res 
     * @param {*} next 
     * @returns 
     */
    async createArticle(req, res, next) {
        try {
            //get data from req.body and also get categiry id form body
            const { categoryId, title, author, summary, publishedYear, abstract, link, journal } = req.body

            //check if id is valid or not
            const checkCategory = await articleService.findById(categoryId);
            if (!checkCategory) {
                throw new NOTFoundException("Category does not exist.")
            }
            // check if article title already exist or not
            const checkTitle = await articleService.findByTitle(title);
            if (checkTitle) {
                throw new BadRequestException("Article title already used.")
            }
            //store article in database
            const newArticle = await articleService.createArticle({
                categoryId,
                title,
                author,
                summary,
                publishedYear,
                abstract,
                link,
                journal
            })
            //return response
            return res
                .status(HTTP_STATUS_CODE.CREATE)
                .json({
                    message: "New article created successfully.",
                    data: new ArticleModel(newArticle)
                })
        } catch (error) {
            return next(error);
        }
    }

    /**
     * Update Article
     * @param {object} req 
     * @param {object} res 
     * @param {*} next 
     * @returns 
     */
    async upadteArticle(req, res, next) {
        try {
            //get data from req.body and also get the article id from body
            const { categoryId, title, author, summary, abstract, link, journal } = req.body;
            const articleId = req.params.id

            //check if category id is valid or not
            const checkCategory = await articleService.findById(categoryId);
            if (!checkCategory) {
                throw new NOTFoundException("Category does not exist.")
            }
            //check if article id is valid or not
            const checkCat = await articleService.getByArticleId(articleId, categoryId);
            if (!checkCat) {
                throw new NOTFoundException("Category does not exist.")
            }
           
            //update article in database
            const updateArticle = await articleService.updateArticle(articleId, {
                title,
                author,
                summary,
                abstract,
                link,
                journal
            }, { new: true })

            //rend response
            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .json({
                    status: HTTP_STATUS_CODE.SUCCESS,
                    message: "Article updated successfully.",
                    data: new ArticleModel(updateArticle)
                })
        } catch (error) {
            return next(error);
        }
    }

    /**
     * Single Article
     * @param {*} req 
     * @param {object} res 
     * @param {*} next 
     * @returns 
     */
    async singleArticle(req, res, next) {
        try {
            //get id from req.params
            const id = req.params.id;

            //chek if id is valid or not
            const checkArticle = await articleService.findByArticleId(id);
            if (!checkArticle) {
                throw new NOTFoundException("Article does not exist.")
            }

            //return response
            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .json({
                    status: HTTP_STATUS_CODE.SUCCESS,
                    data: new ArticleModel(checkArticle),
                    message: "Article found successfully.",
                })
        } catch (error) {
            return next(error);
        }
    }

    /**
     * Get all articles
     * @param {*} req 
     * @param {object} res 
     * @param {*} next 
     * @returns 
     */
    async getAllArticles(req, res, next) {
        try {
            //get category id from req.params
            const id = req.params.id;
            //get page number and pagelimit
            const { page = DEFAULT_PAGE, perPage = DEFAULT_LIMIT, search = "" } = req.query

            //check if id is invalid
            const checkCat = await articleService.findByCategoryId(id)
            if (!checkCat) {
                throw new NOTFoundException("Article does not exist.")
            }

            //get data based on id
            const articles = await articleService.findMany(id, page, perPage, search);
            if (!articles) {
                throw new NOTFoundException("Article does not exist.")
            }
            //return response
            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .json({
                    status: HTTP_STATUS_CODE.SUCCESS,
                    data: articles.data.map((article) => new ArticleModel(article)),
                    message: "Articles found successfully."
                })
        } catch (error) {
            return next(error);
        }
    }

    /**
     * Delete article
     * @param {object} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async deleteArticle(req, res, next) {
        try {
            //get id from req.params
            const id = req.params.id;

            //chek id Article is deleted or not
            const checkArticle = await articleService.findByArticleId(id);
            if (!checkArticle) {
                throw new NOTFoundException("Article does not exist or removed.")
            }
            //delet Article
            await articleService.deleteArticle(id);
            //return response
            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .json({
                    status: HTTP_STATUS_CODE.SUCCESS,
                    message: "Article deleted successfully"
                })
        } catch (error) {
            return next(error)
        }
    }
}

export default new ArticleController();