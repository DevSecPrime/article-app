import NotFoundException from "../../comman/exceptions/notFoundExceptions";
import favouriteArticleService from "./favourites.service";
import { HTTP_STATUS_CODE, DEFAULT_PAGE, DEFAULT_LIMIT } from "../../comman/constants";
import FavouriteArticleModel from "../../models/favourites.model";
import ConflictException from "../../comman/exceptions/conflicatExceptions";

class FavouriteArticleController {

    async addLike(req, res, next) {
        try {
            //get id from request body
            const id = req.user.id;

            //get article id from params
            const { articleId } = req.params

            //chek if user is exist or not
            const user = await favouriteArticleService.findById(id);
            if (!user) {
                throw new NotFoundException("User does not exist.")
            }

            const article = await favouriteArticleService.findByArticleId(articleId);
            if (!article) {
                throw new ConflictException("Article does not exist.")
            }
            //check if article is already liked or not
            const liked = await favouriteArticleService.checkLiked(id, articleId);
            if (liked) {
                throw new ConflictException("Article is already liked.")
            }

            //add like
            const result = await favouriteArticleService.addLike(id, articleId);

            //return response
            return res
                .status(HTTP_STATUS_CODE.CREATE)
                .json({
                    status: HTTP_STATUS_CODE.CREATE,
                    data: new FavouriteArticleModel(result),
                    message: `Article liked successfully.`,
                })
        } catch (error) {
            return next(error)
        }
    }

    async getFavouriteArticles(req, res, next) {
        try {
            //get id from req.user.id
            const id = req.user.id;
            //get page, perPage, search from req.query
            const { page = DEFAULT_PAGE, perPage = DEFAULT_LIMIT, search = "" } = req.query;

            //chek if user is correct or not
            const user = await favouriteArticleService.findById(id);
            if (!user) {
                throw new NotFoundException("User does not exist.")
            }

            const articles = await favouriteArticleService.fetchAllArticles(id, page, perPage, search);
            if (!articles) {
                throw new NotFoundException("Not found.")
            }
            //get Favourite articles
            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .json({
                    status: HTTP_STATUS_CODE.SUCCESS,
                    data: articles.data.map((article) => new FavouriteArticleModel(article)),
                    message: "Favourite articles found successfully.",
                })
        } catch (error) {
            return next(error)
        }
    }

    async removeLike(req, res, next) {
        try {
            //get user from req.user
            const id = req.user.id;
            // console.log("User id", id)
            //get fav id from req.params
            const likedId = req.params.likedId;
            // console.log("fav id", likedId)

            //dislike
            const disliked = await favouriteArticleService.removeLike(id, likedId);
            if (!disliked) {
                throw new NotFoundException("Article is already disliked. ")
            }
            //return response 
            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .json({
                    status: HTTP_STATUS_CODE.SUCCESS,
                    message: `Article disliked successfully.`
                })
        } catch (error) {
            return next(error);
        }
    }
}
export default new FavouriteArticleController();