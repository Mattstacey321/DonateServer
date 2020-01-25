const mongoose= require('mongoose');

const signInSchema= mongoose.Schema({
    id_user:String,
    username:String,
})
module.exports=  mongoose.model('SignIn',signInSchema);