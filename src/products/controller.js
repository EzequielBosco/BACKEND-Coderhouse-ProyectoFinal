const { Router } = require('express')
const uploader = require('../utils/multer')

const router = Router()

const products = []
let idProduct = 0

router.get('/', (req, res) => {
    const { limit } = req.query

    res.json({ message: 'products'})
})

router.get('/:id', (req, res) => {
    res.json({ message: `product ${req.params.id}`})
})

router.post('/', uploader.single('thumbnails'), (req, res) => {
    const { title, description, code, price, stock, category } = req.body
    const file = req.file
    const status = req.body.status === 'true'
    const thumbnails = req.file.path

    idProduct++
    const product = { id: idProduct, title, description, code, price, stock, category, file, thumbnails }

    products.push(product)

    console.log("Datos del producto:", {
        title, description, code, price, status, stock, category, thumbnails
    })
    console.log(products)

    res.json({ message: `create product` })
})

router.put('/:id', (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnails } = req.query
    res.json({ message: 'update product'})
})

router.delete('/:id', (req, res) => {
    res.json({ message: `delete product ${req.params.id}`})
})

module.exports = { products, router }