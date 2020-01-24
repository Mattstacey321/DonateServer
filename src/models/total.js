const mongoose = require('mongoose');

const TotalSchema=  mongoose.Schema({
    id:String,
    totalMoney:Number
})
module.exports= mongoose.model('total',TotalSchema);