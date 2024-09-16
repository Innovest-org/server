const Joi = require('joi');

const createFeedbackValidationSchema = Joi.object({
  rate: Joi.number().min(0).max(5).optional(),
  content: Joi.string().required(),
  userId: Joi.string().hex().length(24).required(),
  projectId: Joi.string().hex().length(24).required(),
  feedbackerId: Joi.string().hex().length(24).optional()
});

const updateFeedbackValidationSchema = Joi.object({
  rate: Joi.number().min(0).max(5).optional(),
  content: Joi.string().optional(),
  userId: Joi.string().hex().length(24).optional(),
  projectId: Joi.string().hex().length(24).optional(),
  feedbackerId: Joi.string().hex().length(24).optional()
});

module.exports = {
  createFeedbackValidationSchema,
  updateFeedbackValidationSchema
};
