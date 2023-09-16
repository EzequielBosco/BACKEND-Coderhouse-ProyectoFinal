const productsController = require('../products/controller')
const cartsController = require('../carts/controller')
// const usersController = require('../users/controller')
const messagesController = require('../messages/controller')
const cookiesController = require('../cookies/controller')

const router = app => {
    app.use('/products', productsController.router)
    app.use('/carts', cartsController)
    // app.use ('/users', usersController)
    app.use('/messages', messagesController)
    app.use('/cookies', cookiesController)
}

module.exports = router