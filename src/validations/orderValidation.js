const Joi = require('@hapi/joi')

//Register Validation

const orderValidation = (params)=> {

    const schema = Joi.object({
        user_id: Joi.string().required(),
        details: Joi.string().required(),
        total_cost: Joi.number().required(),
        shipping_address: Joi.string().required(),
        phone: Joi.string().required(),
    })
    
    return validation = schema.validate(params)
}

module.exports = {orderValidation}