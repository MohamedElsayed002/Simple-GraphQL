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

mongoose.connect('mongodb+srv://mohamedelsayed20258:01093588197@cluster0.fmxethk.mongodb.net/NodeTypescript')
    .then(() => {
        app.listen(3000 , () => {
            console.log('Server is running')
        })
    })
    .catch((error) => {
        console.log(error)
    })

