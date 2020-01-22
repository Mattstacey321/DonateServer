const mongoose= require('mongoose');
const userInfoSchema = mongoose.Schema({
    id:String,
    moneyDonate:Number,
    howManyDays:Number

})
module.exports = mongoose.model('userInfo',userInfoSchema);