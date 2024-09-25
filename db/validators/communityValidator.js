const Joi = require('joi');

const createcommunityValidationSchema= Joi.object({
    name: Joi.string().max(100).required(),
    
    created_at: Joi.date().default(Date.now),
    updated_at: Joi.date().default(Date.now),
    
    description: Joi.string().required(),
    image: Joi.string().uri().optional(),
    
    admin_id: Joi.string().required(),

});


module.exports = {createcommunityValidationSchema };