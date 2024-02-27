const express = require('express')
const mongoose = require('mongoose')
const {graphqlHTTP} = require('express-graphql')
const schema = require('./graphql/schema')

const app = express()


app.get('/' , (req,res) => {
    res.send('Mohamed Elsayed')
})


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(3000, () => {
    console.log('server running')
})