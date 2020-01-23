const mongoose= require('mongoose');
const userInfoSchema = mongoose.Schema({
    id:String,
    totalMoney:Number, // tong so tien da dong + cu donate la cong vao
    days:Number, //so luong ngay da dong
    
    daysLogin:Number,
    lastDaysLogin:String //luu ngay check in cuoi cung

})
module.exports = mongoose.model('userInfo',userInfoSchema);