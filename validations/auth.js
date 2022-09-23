const Joi = require("joi");

exports.login = {
    body: Joi.object({
        email: Joi.string().email().required().trim().lowercase(),
        password: Joi.string().required().min(8).max(128).trim(),
    })
}