const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const interestSchema = new mongoose.Schema({
  id: { type: String, default: uuidv4, unique: true },

  name: { type: String, required: true },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

const Interest = mongoose.model('Interest', interestSchema);


const Joi = require('joi');

const createInterestValidationSchema = Joi.object({
  name: Joi.string().max(255).required(),
  users: Joi.array().items(Joi.string().hex().length(24)).optional()
});

const updateInterestValidationSchema = Joi.object({
  name: Joi.string().max(255).optional(),
  users: Joi.array().items(Joi.string().hex().length(24)).optional()
});

module.exports = {
  Interest,
  createInterestValidationSchema,
  updateInterestValidationSchema
};
