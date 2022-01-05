const express = require('express')
const path = require('path')
const logger = require('morgan')
const mongoose = require('mongoose')


const port = 3000

// connect to mongodb
const mongoDB = "mongodb+srv://gbxander:test1234@sailchimp.e6x8s.mongodb.net/sailchimp-db?retryWrites=true&w=majority"
mongoose.connect(mongoDB, {useUnifiedTopology: true, useNewUrlParser: true})
        .then(result => app.listen(port, (req, res) => {
            console.log("listening on port: " + port)
        }))
        .catch(err => console.log(err))

// express app
const app = express()

// register view engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// middleware & static files
app.use(logger('dev'))
app.use(express.static(path.join(__dirname, 'public')))

// routes
app.get('/', (req, res) => {
    res.render('home', {title: 'Home'})
})

app.get('/sign-up', (req, res) => {
    res.render('sign-up', {title: 'Sign-up'})
})

app.get('/sign-in', (req, res) => {
    res.render('sign-in', {title: "Sign-in"})
})

app.get('/posts', (req, res) => {
    const posts = []
    res.render('posts', {title: "All Posts", posts})
})

app.get('/my-posts', (req, res) => {
    const posts = []
    res.render('posts', {title: "My Posts", posts})
})


// 404 error handler
app.use((req, res) => {
    res.status(404).render('404', {title: '404'})
})