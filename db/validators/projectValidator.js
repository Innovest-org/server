const Joi = require('joi');

const projectValidationSchema = Joi.object({
    project_id: Joi.string().required(),
    entrepreneur_id: Joi.string().required(),
    created_at: Joi.date().default(Date.now),  
    updated_at: Joi.date().default(Date.now),  
    project_name: Joi.string().required(),
    description: Joi.string().required(),
    document: Joi.string().optional(),  
    status: Joi.string().valid('SEEKING', 'UNDER_REVIEW', 'FUNDING' , 'FUNDED' ).required(),
    visibility: Joi.boolean().default(true),
    field: Joi.string().required(),
    budget: Joi.number().required(),
    offer: Joi.number().required(),
    target: Joi.number().required(),
    deadline: Joi.string().required(), 
});

// Exporting the validation schema
module.exports = { projectValidationSchema };
