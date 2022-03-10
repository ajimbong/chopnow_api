const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const OrderSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    user_id: {
        type : String,
        required : true
    },
    details: {
        type : String,
        required : true
    },
    total_cost: {
        type : Number,
        required : true
    },
    shipping_address: {
        type : String,
        required : true
    },
    phone: {
        type : String,
        required : true
    },
   

})

 

module.exports = mongoose.model('Order', OrderSchema) ;