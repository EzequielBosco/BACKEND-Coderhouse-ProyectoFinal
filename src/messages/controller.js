const { Router } = require('express')
const Messages = require('../models/messages.model')

const router = Router()

router.get('/', (req, res) => {
    res.render('chat')
    }
)

router.get('/list', async (req, res) => {
    try {
        const messages = await Messages.find()

        res.json({ status: 'success', message: messages })
    } catch (error) {
        console.log(error)
    }
})

// router.post('/mess', async (req, res) => {
//     try {
//         const { user, message } = req.body

//         const newMessage = {
//             user,
//             message,
//             date: new Date()
//         }

//         const messages = await Messages.create(newMessage)

//         res.json({ status: 'success', message: messages })
//     } catch (error) {
//         res.json({ status: 'error' })
//     }
// })

module.exports = router