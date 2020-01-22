const SignIn = require('../models/signIn');
const UserInfo = require('../models/userInfo'); 

module.exports = resolvers = {
    Query:{
        isAccountExist :async(root,{id})=>{
            return SignIn.find({'id_user':id}).then((val)=>{
                if(val.length==1){
                    return true;
                }
                else return false;
            });
        }
    },
    Mutation:{
        createUser: async (root, {input})=>{
            return SignIn.create(input).then((value) => {
                console.log(value)
                return value;
            });
        },
      
        
    }

}