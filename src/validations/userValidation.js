const Joi = require('@hapi/joi')

//Register Validation

const registerValidation = (params)=> {

    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required()
    })
    
    return validation = schema.validate(params)
}

const loginValidation = (params)=> {

    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    })
    
    return validation = schema.validate(params)
}

module.exports = {registerValidation, loginValidation}