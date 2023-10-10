const { Router } = require('express')
const router = Router()
const ProductsDao = require('../DAOs/productsMongo.dao')

const Products = new ProductsDao()
// const { products } = require('../products/controller')
const Carts = require('../models/carts.model')
// const carts = []

// router.post('/', (req, res) => {
//     const { productId } = req.body

//     let productCart = carts.find(p => p.id === productId)
//     const productToAdd = products.find(product => product.id === parseInt(productId))

//     if (!productCart) {
//         if (productToAdd) {
//             const newCart = { id: productId, products: [{ id: productId, quantity: 1 }] }
//             carts.push(newCart)

//             res.json({ message: 'Product added to cart' })
//         } else {
//             res.status(404).json({ message: 'Product not found' })
//         }
//     } else {
//         const productInCart = productCart.products.find(p => p.id === productId)
//         if (productInCart) {
//             productInCart.quantity += 1
//             res.json({ message: 'Product added to cart', cart: productCart })
//         } else {
//             productCart.products.push({ id: productId, quantity: 1 })
//         }
//         res.json({ message: 'Product added to cart', cart: productCart })
//     }
// })

router.post('/', async (req, res) => {
    const productId = req.body.productId

    try {

        const productToAdd = Products.findById(productId)
        
        if (!productToAdd) {
            res.status(404).json({ message: 'Product not found' })
        } 
        
        const cart = await Carts.findOne()
        if (!cart) {
            const cart = new Carts({
                products: [{ productId: productId, quantity: 1 }],
            })

            await cart.save()
        } else {
            const productInCart = cart.products.find(
                (product) => product.productId.toString() === productId
            )

            if (productInCart) {
                productInCart.quantity += 1
            } else {
                cart.products.push({ productId: productId, quantity: 1 });
            }

            await cart.save()
        }
        res.json({ message: 'Product added to cart', cart: cart })
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding product to cart' })
    }
})
    
router.get('/', async (req, res) => {

    const carts = await Carts.find().lean()
    if (req.session.user && req.session.user.role === 'user') {
        if (carts) { 
            res.render('carts', { carts })
        } else {
            res.status(404).json({ message: 'Cart is empty' })
        }
    } else {
        req.session.returnTo = '/products'
        res.redirect('/session/login')
    }
})

router.get('/:id', async (req, res) => {
    const cartId = req.params.id
    
    try {
        const cart = await Carts.findById(cartId).populate('products')

        if (req.session.user && req.session.admin) {
            if (cart) { 
                res.render('cartDetail', { cart })
            } else {
                res.status(404).json({ message: 'Cart not found' })
            }
        }
    } catch (error) {
        res.status(404).json({ error: 'Cart not found' })
        res.redirect('/session/login')
    }
})

module.exports = router