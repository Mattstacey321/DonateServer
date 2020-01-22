const express= require('express');
const cors= require('cors');
const { ApolloServer } = require('apollo-server');
const mongoose= require('mongoose');
const Schema= require('./src/schemas/schemas');
const app= express();
app.use(cors());
require('dotenv').config()
const port = process.env.PORT || 3000;

const server = new ApolloServer({
    cors:true,
    schema: Schema,
    playground: true,
    introspection: true
}); 


server.listen().then(({ url }) => {
   
    console.log(`🚀  Server ready at ${url}`);
    mongoose.Promise = global.Promise;
    mongoose.set('useFindAndModify', false);
    mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true }, (res, err) => {

        console.log('Connected to MongoDB');
    })
});