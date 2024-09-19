import joi from "joi";

export const articleSchema = joi.object({
    categoryId: joi.number().required().messages({
        "any.required": "Category id is required."
    }),
    title: joi.string().required().max(500).messages({
        "string.empty": "Title is required.",
        "string.max": "Title is too long."
    }),
    author: joi.string().max(255).messages({
        "string.empty": "Author is required.",
        "string.max": "Name is too long"
    }),
    summary: joi.string().optional().messages({
        "string.empty": "Summary is empty"
    }),
    publishedYear: joi.string().required().messages({
        "string.empty": "Year is empty.",
    }),
    abstract: joi.string().required().messages({
        "string.empty": "Abstract is empty",
    }),
    link: joi.string().required().max(500).messages({
        "string.empty": "Link is empty",
        "string.max": "Characters are too long"
    }),
    journal: joi.string().required().max(255).messages({
        "string.empty": "Journal is required",
        "string.max": "Name is too long"
    })
})

export const updateArticleSchema = joi.object({
    categoryId: joi.number().required().messages({
        "any.required": "Category id is required."
    }),
    title: joi.string().optional().max(500).messages({
        "string.empty": "Title is required.",
        "string.max": "Title is too long."
    }),
    author: joi.string().max(255).messages({
        "string.empty": "Author is required.",
        "string.max": "Name is too long"
    }),
    summary: joi.string().optional().messages({
        "string.empty": "Summary is empty"
    }),
    publishedYear: joi.string().messages({
        "string.empty": "Year is empty.",
    }),
    abstract: joi.string().messages({
        "string.empty": "Abstract is empty",
    }),
    link: joi.string().max(500).messages({
        "string.empty": "Link is empty",
        "string.max": "Characters are too long"
    }),
    journal: joi.string().max(255).messages({
        "string.empty": "Journal is required",
        "string.max": "Name is too long"
    })
})