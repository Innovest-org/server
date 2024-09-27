const Joi = require('joi');

const createpageValidationSchema= Joi.object({
    id: Joi.string().required(), 
    title:Joi.string().max(500).required(),
    content:Joi.string().min(1).max(500).required(),
    location:Joi.string().optional(),
    image_url:Joi.array().items(Joi.string().uri()).optional(),
    page_url:Joi.string().uri().optional(),

    start_time: Joi.date().optional(),
    end_time: Joi.date().optional(),

    admin_state: Joi.string().required().default('APPROVER'),
    page_state: Joi.string().required().default('PENDING'),

    created_at: Joi.date().default(Date.now),
    updated_at: Joi.date().default(Date.now),

    user_id:Joi.string().required(), 
    admin_id: Joi.string().required(),
    
});


module.exports = {createpageValidationSchema };



