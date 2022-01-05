require('dotenv').config()

const express = require('express')
const session = require('express-session')
const path = require('path')
const logger = require('morgan')
const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/user')
const Post = require('./models/post')

const port = 3000

// connect to mongodb
mongoose.connect(process.env.DB_URI, {useUnifiedTopology: true, useNewUrlParser: true})
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
app.use(express.urlencoded({extended: false}))

// routes
app.get('/', (req, res) => {
    res.render('home', {title: 'Home'})
})

app.get('/sign-up', (req, res) => {
    res.render('sign-up', {title: 'Sign-up'})
})

app.post('/sign-up', (req, res) => {
    const { email, username, password, subscribed = "off" } = req.body

    const user = new User({
        email,
        username,
        password,
        subscribed: subscribed === 'on' ? true : false
    })

    user.save()
        .then(doc => {
            res.redirect('/')
        })
        .catch(err => console.log(err))
})

app.get('/sign-in', (req, res) => {
    res.render('sign-in', {title: "Sign-in"})
})

app.get('/posts', (req, res) => {
    Post.find()
        .then(posts => {
            res.render('posts', {title: "All Posts", posts})
        })
        .catch(err => {
            console.log(err)
        })
})

app.get('/my-posts', (req, res) => {
    /** @todo fetch user's posts */
    res.render('posts', {title: "My Posts", posts})
})


// 404 error handler
app.use((req, res) => {
    res.status(404).render('404', {title: '404'})
})