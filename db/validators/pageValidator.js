const Joi = require('joi');

const pageSchema = Joi.object({

    title: Joi.string().max(500).required(),
    content: Joi.string().required(),
    location: Joi.string().optional(),
    images_url: Joi.array().items(Joi.string().uri()).optional(),
    page_url: Joi.string().uri().required(),
    start_time: Joi.date().optional(),
    end_time: Joi.date().optional(),
    page_type: Joi.string().valid('EVENT', 'ARTICLE', 'POST', 'PROJECT_INFO').required(),
    tags: Joi.array().items(Joi.string()).optional(),
    author: Joi.string(),
    admin_id: Joi.string().required(),
});

// Validation function for creating a page
const validateCreatePage = (pageData) => {
    return pageSchema.validate(pageData);
};

const validateUpdatePage = (pageData) => {
    const updateSchema = pageSchema.fork(['title', 'content', 'location', 'images_url', 'start_time', 'end_time', 'tags'], (field) => field.optional());

    return updateSchema.validate(pageData);
};

module.exports = {
    validateCreatePage,
    validateUpdatePage,
};
