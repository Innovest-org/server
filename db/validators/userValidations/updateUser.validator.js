const Joi = require('joi');

const updateUserValidationSchema = Joi.object({
  createdAt: Joi.date().forbidden(), // Creation date should not be updated
  updatedAt: Joi.date().default(() => new Date(), 'current date').optional(),
  firstName: Joi.string().max(30).optional(),
  lastName: Joi.string().max(30).optional(),
  userName: Joi.string().max(50).optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().optional(),
  phone: Joi.string().max(15).optional(),
  country: Joi.string().optional(),
  languages: Joi.array().items(Joi.string()).optional(),
  profileImage: Joi.string().uri().optional(),
  socialLinks: Joi.array().items(Joi.string().uri()).optional(),
  role: Joi.string().valid('ENTREPRENEUR', 'INVESTOR', 'MENTOR', 'ADMIN').optional(),
  isVerified: Joi.boolean().optional(),
  isActive: Joi.boolean().optional(),
});

module.exports = { updateUserValidationSchema };
