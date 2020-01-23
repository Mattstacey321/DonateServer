const mongoose = require('mongoose');

const TotalSchema=  mongoose.Schema({
    totalMoney:Number
})
module.exports= mongoose.model('total',TotalSchema);