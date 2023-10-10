const express = require('express')
const methodOverride = require('method-override')
const handlebars = require('express-handlebars')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const connectMongo = require('./db')
const mongoStore = require('connect-mongo')
const { db } = require("./config/index.config")
const initializePassport = require('./config/passport.config')
const passport = require('passport')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use(methodOverride('_method'))
app.use(cookieParser('secret'))
app.use(bodyParser.urlencoded({ extended:true }))
app.use(session({ 
    store: mongoStore.create({
        mongoUrl:`mongodb+srv://${db.user}:${db.pass}@${db.host}/${db.name}?retryWrites=true&w=majority`,
        mongoOptions:{useNewUrlParser:true,useUnifiedTopology:true},
        // ttl:15
    }),
    secret:'new-secret', 
    resave:false, 
    saveUninitialized:false 
}))

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

connectMongo()

module.exports = app