const dishRoutes = require('./dishRoute')

function route(app){
    // app.use('/api/authentication',)
    app.use('/api/dish', dishRoutes)
    // app.use('api/ingredient',)
}

module.exports = route