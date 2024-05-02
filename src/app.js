require('dotenv').config({path:'./.env'})

const connectDB = require('./db')
const express = require('express')
const path = require('path')
const routes = require('./routes/routes')

// const handlebars = require('express-handlebars')
// const path = require('path')
// const routes = require('./routes/router')
// const connectDB = require('./config/database')
// const defaultAdmin = require('./config/defaultAdmin')
// const cookieParser = require('cookie-parser')
// const session = require('express-session')
// const app = express()

app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
connectDB()
routes(app)



module.exports = app