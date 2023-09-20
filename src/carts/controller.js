const { Router } = require('express')
const router = Router()

const { products } = require('../products/controller')
const carts = []

router.post('/', (req, res) => {
    const { productId } = req.body

    let productCart = carts.find(p => p.id === productId)
    const productToAdd = products.find(product => product.id === parseInt(productId))

    if (!productCart) {
        if (productToAdd) {
            const newCart = { id: productId, products: [{ id: productId, quantity: 1 }] }
            carts.push(newCart)

            res.json({ message: 'Product added to cart' })
        } else {
            res.status(404).json({ message: 'Product not found' })
        }
    } else {
        const productInCart = productCart.products.find(p => p.id === productId)
        if (productInCart) {
            productInCart.quantity += 1
            res.json({ message: 'Product added to cart', cart: productCart })
        } else {
            productCart.products.push({ id: productId, quantity: 1 })
        }
        res.json({ message: 'Product added to cart', cart: productCart })
    }
})

router.get('/', (req, res) => {

    if (carts.length > 0) { 
        res.render('carts', { carts })
        // res.json({ cart: carts })
    } else {
        res.status(404).json({ message: 'Cart is empty' })
    }
})

module.exports = router