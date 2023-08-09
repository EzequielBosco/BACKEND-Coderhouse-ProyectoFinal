const { Router } = require('express')
const uploader = require('../utils/multer')

const router = Router()

const products = []
let idProduct = 0

router.get('/', (req, res) => {
    const { limit } = req.query

    if (products.length > 0) {
        res.json({ message: products })
    } else {
        res.status(401).json({ message: 'Products not found' })
    }
})

router.get('/:id', (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const product = products.find(product => product.id === productId)

        if (product) {
            res.json(product)
        } else {
            res.status(404).json({ error: 'Product not found' })
        }
    } catch (error) {
        res.status(404).json({ error: 'Product not found' })
    }
})

router.post('/', uploader.single('thumbnails'), (req, res) => {
    try {    
        const { title, description, code, price, stock, category } = req.body
        
        if (!title || !description || !code || !price || !stock || !category) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        const file = req.file
        const status = req.body.status === 'true'
        const thumbnails = req.file ? req.file.path : ''


        idProduct++
        const product = { id: idProduct, title, description, code, price, stock, category, file, thumbnails }

        products.push(product)

        console.log("Datos del producto:", {
            title, description, code, price, status, stock, category, thumbnails
        })
        console.log(products)

        res.json({ message: `create product` })
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.post('/:id', (req, res) => {
    const productId = parseInt(req.body.productId);
    const product = products.find(product => product.id === productId)

    if(product) {
        product.title = req.body.title,
        product.description = req.body.description,
        product.code = req.body.code,
        product.price = req.body.price,
        product.stock = req.body.stock,
        product.category = req.body.category,
        product.file = req.body.file,
        product.thumbnails = req.body.thumbnails
        res.json({ message: 'updated product'})
    } else {
        res.status(404).json({ error: 'Product not found' })
    }
})

router.delete('/:id', (req, res) => {
    const productId = parseInt(req.req.params)
    const productIndex = products.findIndex(product => product.id === productId)

    if (productIndex !== -1) {
        products.splice(productIndex, 1)
        res.json({ message: 'Product deleted' })
    } else {
        res.status(404).json({ error: 'Product not found' })
    }
})

module.exports = { products, router }