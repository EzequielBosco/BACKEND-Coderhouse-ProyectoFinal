const { Router } = require('express')
const uploader = require('../utils/multer')
const ProductsDao = require('../DAOs/productsMongo.dao')
const ProductsModel = require("../models/product.model")

const Products = new ProductsDao()

const router = Router()

const products = []
let idProduct = 0

// SIN PAGINATE
// router.get('/', async (req, res) => {
//     try {
//         const products = await Products.findAll()
//         res.render('products', { products })
//     } catch (error) {
//         res.json({ status:'error', error })
//     }
// })

router.get('/', async (req, res) => {
    try {
        const { limit = 10, page = 1 } = req.query

        const options = {
            lean: true,
            limit: parseInt(limit),
            page: parseInt(page)
        }
        const products = await ProductsModel.paginate({}, options)

        // paso todo para usar el paginate en handlebars
        res.render('products', { products })
        // paso .docs para ver solo los products de la vista
        // res.render('products', { products: products.docs })
    } catch (error) {
        res.json({ status:'error', error })
    }
})

router.get('/create', (req, res) => {
    res.render('index')
})

router.get('/list', async (req, res) => {
    // const { limit } = req.query
    const products = await Products.findAll()
    res.json({ message: products })

    // if (products.length > 0) {
    //     res.json({ message: products })
    // } else {
    //     res.status(401).json({ message: 'Products not found' })
    // }
})

router.get('/:id', async (req, res) => {
    try {
        const productId = req.params.id
        const product = await Products.findById(productId)

        if (product) {
            res.render('productDetail', { product })
        } else {
            res.status(404).json({ error: 'Product not found' })
        }
    } catch (error) {
        res.status(404).json({ error: 'Product not found' })
    }
})

// router.get('/paginate', async (req, res) => {
//     try {

//         const { limit, page } = req.query
//         const payload = await ProductsModel.paginate(
//             {},
//             { limit: Number(limit), page: Number(page) }
//         )
//         res.json({ status: 'success', payload })
//     } catch (error) {
//         res.json({ status: 'error' })
//     }
// })

router.post('/create', uploader.single('thumbnails'), async (req, res) => {
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

        const newProduct = {
            title: title,
            description: description,
            code: code,
            price: price,
            stock: stock,
            category: category
        }
        
        await Products.insertOne(newProduct)

        products.push(product)
        
        console.log("Data product:", {
            title, description, code, price, status, stock, category, thumbnails
        })

        res.json({ message: 'Product created successfully', data: newProduct })
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