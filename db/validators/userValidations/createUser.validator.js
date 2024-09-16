const Joi = require('joi');

const createUserValidationSchema = Joi.object({
  createdAt: Joi.date().default(() => new Date()),
  updatedAt: Joi.date().default(() => new Date()),
  firstName: Joi.string().max(30).required(),
  lastName: Joi.string().max(30).required(),
  userName: Joi.string().max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phone: Joi.string().max(15).optional(),
  country: Joi.string().required(),
  languages: Joi.array().items(Joi.string()).optional(),
  profileImage: Joi.string().uri().default('https://i.ibb.co/6WtQfMm/default.png'),
  socialLinks: Joi.array().items(Joi.string().uri()).optional(),
  role: Joi.string().valid('ENTREPRENEUR', 'INVESTOR', 'MENTOR', 'ADMIN').default('ENTREPRENEUR'),
  isVerified: Joi.boolean().default(true),
  isActive: Joi.boolean().default(true),
});

module.exports = { createUserValidationSchema };
