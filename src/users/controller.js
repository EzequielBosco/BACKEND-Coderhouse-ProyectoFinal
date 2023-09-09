const { Router } = require('express')
// const Users = require('../models/users.model')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const messages = await Users.find()

        res.json({ message: messages })
    } catch (error) {
        console.log(error)
    }
})

router.post('/', async (req, res) => {
    try {
        const { value } = req.body

        const numberInfo = {
            value
        }

        const newNumber = await Numbers.create(numberInfo)

        res.json({ message: newNumber })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router