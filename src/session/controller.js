const { Router } = require('express')
const Users = require('../models/users.model')

const router = Router()

router.get('/register', (req, res) => {
    if (req.session.user && req.session.admin) {
        const userId = req.session.user._id
        const profileUrl = `/session/profile/${userId}`

        return res.redirect(profileUrl)
    }

    res.render('register')
})

router.post('/register', async (req, res) => {
    if (req.session.user && req.session.admin) {
        return res.send('You are already logged in')
    }

    try {
        const { first_name, last_name, email, age, password } = req.body
    
        const data = {
            first_name,
            last_name,
            email,
            age,
            password
        }

        const newUser = await Users.create(data)

        res.json({ message: 'successful register', data: newUser })
    } catch (error) {
        res.status(500).json({ error: 'Register error' })
    }
})

router.get('/login', (req, res) => {
    if (req.session.user && req.session.admin) {
        const userId = req.session.user._id
        const profileUrl = `/session/profile/${userId}`

        return res.redirect(profileUrl)
    }

    res.render('login')
})

router.post('/login', async (req, res) => {
    if (req.session.user && req.session.admin) {
        return res.send('You are already logged in')
    }

    try {    
        const { email, password } = req.body
    
        const user = await Users.findOne({ email })

        if (!user) {
            return res.send('User not find')
        }
        
        if (user.password === password) {

            req.session.user = user
            req.session.admin = true

            return res.json({ message: 'successful login' })
        } else {
            return res.send('Password not match')
        }
    } catch (error) {
        res.status(500).json({ error: 'Login error' })
    }
})

router.get('/', (req, res) => {
    if(req.session.counter) {
        req.session.counter++
        res.send(`Site visited ${req.session.counter} times`)
    } else {
        req.session.counter = 1
        res.send('Welcome!')
    }
})

function auth(req, res, next) {
    try {
        if (req.session.user && req.session.admin) {
            return next()
        } else {
            return res.status(401).send('You don´t have access')
        }
    } catch (error) {
        return res.status(401).send('Auth error')
    }
}

router.get('/private', auth, (req, res) => {
    res.send('You have admin acces')
})

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.send({ status: 'Logout ERROR', body: err })
        } else {
            res.send('Logout ok!')
        }
    })
})

router.get('/profile/:id', auth, async (req, res) => {
    try {
        const { id } = req.params
        const user = await Users.findOne({ _id: id })

        if (!user) {
            return res.send('User profile not find')
        }

        res.render('profile', { user: user })
    } catch (error) {
        res.status(500).json({ error: 'User profile error' })
    }
})

module.exports = router