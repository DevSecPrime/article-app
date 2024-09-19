// import BadRequestException from "../../comman/exceptions/badRequestExceptions";
import categoryService from "./category.service"
import ConflictException from "../../comman/exceptions/conflicatExceptions";
import { HTTP_STATUS_CODE, DEFAULT_PAGE, DEFAULT_LIMIT } from "../../comman/constants";
import CategoryModel from "../../models/categoryModel"
import NOTFoundException from "../../comman/exceptions/notFoundExceptions"
import BadRequestException from "../../comman/exceptions/badRequestExceptions";
class CategoryController {
    /**
     * Create category
     * @param {object} req 
     * @param {object} res 
     * @param {*} next 
     * @returns 
     */
    async createCategory(req, res, next) {
        try {
            //get category name from req.body
            const { categoryName, color } = req.body;

            //chek if category name is already exist or not
            const category = await categoryService.findByCategoryName(categoryName);
            if (category) {
                throw new ConflictException("Category already exists");
            }

            //store category in database
            const newCategory = await categoryService.createCategory({
                categoryName,
                color
            });

            //retrun response
            return res
                .status(HTTP_STATUS_CODE.CREATE)
                .json({
                    message: "New category created successfully.",
                    data: new CategoryModel(newCategory)
                })
        } catch (error) {
            return next(error);
        }
    }

    /**
     * Update category.
     * @param {object} req 
     * @param {object} res 
     * @param {*} next 
     * @returns 
     */
    async updateCategory(req, res, next) {
        try {
            //get id from req.params
            const id = req.params.id
            //get data from req.body
            const { categoryName, color } = req.body;
            //check if category name already in use or not
            const checkCat = await categoryService.findById(id);
            if (!checkCat) {
                throw new NOTFoundException("Category not found.")
            }

            //chek if categort name already in use or not
            if (categoryName) {
                const catName = await categoryService.checkByCategory(categoryName, id);
                if (catName) {
                    throw new ConflictException("Category already exists in other category.")
                }
            }

            //update data
            const updateData = {}
            if (categoryName) {
                updateData.categoryName = categoryName
            }

            if (color) {
                updateData.color = color
            }

            //chek if not data is provided forupdate 
            if (Object.keys(updateData).length === 0) {
                throw new BadRequestException("No data provided for update.")
            }
            //update category in database
            const updateCategory = await categoryService.updateCategory(id, updateData);

            //send response
            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .json({
                    status: HTTP_STATUS_CODE.SUCCESS,
                    data: new CategoryModel(updateCategory),
                    message: "Category updated successfully."
                })
        } catch (error) {
            return next(error);
        }
    }


    /**
     * Delete category
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async deleteCategory(req, res, next) {
        try {
            //get id from req.params
            const id = req.params.id;
            //check if id is exist or not
            const checkCat = await categoryService.findById(id);
            if (!checkCat) {
                throw new NOTFoundException("Category does not exist.");
            }
            //delete category
            await categoryService.deleteCategory(id);

            //send response
            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .json({
                    status: HTTP_STATUS_CODE.SUCCESS,
                    message: "Category is removrd successfully."
                })
        } catch (error) {
            return next(error);
        }
    }

    /**
     * Get all categories
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async getAllCategories(req, res, next) {
        try {
            const { page = DEFAULT_PAGE, perPage = DEFAULT_LIMIT, search = "" } = req.query
            // const checkSearch = await categoryService.findBySearch(search)
            // if (checkSearch.length === 0 || !checkSearch) {
            //     throw new NOTFoundException("No category found")
            // }
            const allCategories = await categoryService.getAllCategories(page, perPage, search);
            // if (allCategories.data.length === 0) {
            //     throw new NOTFoundException("No category exist")
            // }

            //return response
            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .json({
                    message: "All categories fetched successfully.",
                    data: allCategories.data.map((category) => new CategoryModel(category))
                })

        } catch (error) {
            return next(error);
        }
    }
}


export default new CategoryController()