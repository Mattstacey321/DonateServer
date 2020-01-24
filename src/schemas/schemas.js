const { gql } = require('apollo-server');
const  Resolvers = require('../resolver/resolver'); 
const { makeExecutableSchema } = require('apollo-server-express');

const typeDefs=  gql`
    type Query{
        isAccountExist(times:String,userID:String):Boolean
        addUser(id:String,username:String):[User]
        howManyDaysLogin(id:String):Int
        totalMoney(id:String):Int
    }
    type User{
        id_user:String,
        username:String
    }
    input UserInput{
        id_user:String
        username:String
    }
    type Mutation{
        createUser(input:UserInput):Boolean
        checkDays(id:String):String
        donateMoney(id:String):String
    }

`;
const schema = makeExecutableSchema({
    typeDefs:typeDefs,
    resolvers:Resolvers
})
module.exports = schema;