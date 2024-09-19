import joi from "joi";

export const categorySchema = joi.object({
    categoryName: joi.string().max(500).required().messages({
        "string.empty": "Category name is required.",
        "string.max": "Category name is too long."
    }),
    color: joi.string().max(255).required().messages({
        "string.empty": "Color is required.",
        "string.max": "Characters are too long."
    })
});

export const updateCategorySchema = joi.object({
    categoryName: joi.string().max(500).optional().messages({
        "string.empty": "Category name is required.",
        "string.max": "Category name is too long."
    }),
    color: joi.string().max(255).optional().messages({
        "string.empty": "Color is required.",
        "string.max": "Characters are too long."
    })
});
