const { gql } = require('apollo-server');
const  Resolvers = require('../resolver/resolver'); 
const { makeExecutableSchema } = require('apollo-server-express');

const typeDefs=  gql`
    type Query{
        isAccountExist(id:String):Boolean
        addUser(id:String,username:String):[User]
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
        createUser(input:UserInput):User
    }

`;
const schema = makeExecutableSchema({
    typeDefs:typeDefs,
    resolvers:Resolvers
})
module.exports = schema;