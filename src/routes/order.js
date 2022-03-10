const router = require('express').Router()
const Order = require('../models/ordermodel')
const {orderValidation} = require('../validations/orderValidation')

const verify = require('../middlewares/verifyToken')
const upload = require('../utils/multer')

router.post('/', upload.single('image'), verify, async (req, res)=>{
    const {error, value } = orderValidation(req.body)
    if(error){
        res.status(400).json({error : error.details[0].message})
        return
    }

    const order = new Order({
        user_id: value.user_id,
        details: value.details,
        total_cost: value.total_cost,
        shipping_address: value.shipping_address,
        phone: value.phone, 
    }) 
    
    try{
        await order.save()
        res.status(201).json({msg : 'Order created succesffully'})
    }catch(err){
        console.log(err)
        res.json({error: 'Sorry there was an error'})
    }
})

module.exports = router