const productsController = require('../products/controller')
const cartsController = require('../carts/controller')
// const usersController = require('../users/controller')
const messagesController = require('../messages/controller')
const cookiesController = require('../cookies/controller')
const sessionController = require('../session/controller')
const home = require('../home/controller')

const router = app => {
    app.use('/products', productsController.router)
    app.use('/carts', cartsController)
    // app.use ('/users', usersController)
    app.use('/messages', messagesController)
    app.use('/cookies', cookiesController)
    app.use('/session', sessionController)
    app.use('/', home),
    app.use('*', (req, res) => {
        res.render('notFound')
    })
}

module.exports = router