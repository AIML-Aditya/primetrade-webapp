const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const taskSchema = Joi.object({
  title: Joi.string().min(1).max(200).required(),
  description: Joi.string().allow('').max(2000),
  status: Joi.string().valid('todo','in-progress','done'),
  tags: Joi.array().items(Joi.string()),
  dueDate: Joi.date().optional()
});

module.exports = { registerSchema, loginSchema, taskSchema };