require('dotenv').config({path:'./.env'})
const http = require('http')
const { config } = require('process')
const app = require('./app')

const port = process.env.PORT || 3000

const server = http.createServer(app)

server.listen(port, ()=>{
    console.log(`app listen on port ${port}`)
})
