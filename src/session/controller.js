const { Router } = require('express')
const Users = require('../models/users.model')
// const { getHashedPassword, comparePassword } = require('../utils/bcrypts')
const passport = require('passport')

const router = Router()

const redirectLogin = "/session/login"
const profileUrl = "/session/profile"

router.get('/register', (req, res) => {
    if (req.session.user && req.session.user.role === 'user') {
        // const userId = req.session.user._id
        // const profileUrl = `/session/profile/${userId}`

        return res.redirect(profileUrl)
    }

    res.render('register')
})

router.post('/register', passport.authenticate('register'), async (req, res) => {
    if (req.session.user && req.session.user.role === 'user') {
        return res.send('You are already logged in')
    }

    try {
        // la logica la creo en config usando passport
        // const { first_name, last_name, email, age, password } = req.body

        // if(!first_name || !last_name || !email || !age || !password) return res.status(400).json({ status: 'error', error: 'Bad request' })
    
        // const user = await Users.findOne({ email })

        // if (user) {
        //     return res.status(400).json({  status: 'error', error: 'User exists' })
        // }

        // const data = {
        //     first_name,
        //     last_name,
        //     email,
        //     age,
        //     password: getHashedPassword(password)
        // }

        // const newUser = await Users.create(data)

        return res.status(201).json({ message: 'Successful register', data: req.user, redirect: redirectLogin })
    } catch (error) {
        res.status(500).json({ error: 'Register error' })
    }
})

router.get('/login', (req, res) => {

    if (req.session.user && req.session.user.role === 'user') {
        // const userId = req.session.user._id
        // const profileUrl = `/session/profile/${userId}`

        return res.redirect(profileUrl)
    }

    res.render('login')
})

router.post('/login', passport.authenticate('login'), async (req, res) => {
    if (req.session.user && req.session.role === 'user') {
        return res.status(400).json({ error: 'You are already logged in' })
    }

    try {    
        if(!req.user) return res.status(400).json({ status: 'error', error: 'Invalid credentials'})

        req.session.user = {
            first_name: req.user.first_name,
            email: req.user.email,
            role: 'user'
        }

        // const userId = req.user._id
        // const profileUrl = `/session/profile/${userId}`

        return res.status(200).json({ message: 'Login successful', redirect: profileUrl});

        // logica en passport config
        // const { email, password } = req.body
    
        // if(!email || !password) return res.status(400).json({ status: 'error', error: 'Bad request' })

        // const user = await Users.findOne({ email })

        // if (!user) {
        //     return res.status(400).json({  status: 'error', error: 'user and password do not match' })
        // }
        
        // if (comparePassword(password, user.password)) {

        //     req.session.user = user
        //     req.session.admin = true

        //     if (req.session.returnTo) {
        //         // user a la URL 'returnTo'
        //         const returnTo = req.session.returnTo
        //         delete req.session.returnTo
        //         return res.status(200).json({ message: 'Login successful', redirect: returnTo });
        //     } else {
        //         // user al perfil
        //         const userId = req.session.user._id
        //         const profileUrl = `/session/profile/${userId}`
        //         return res.status(200).json({ message: 'Login successful', redirect: profileUrl })
        //     }
        // } else {
        //     return res.status(400).json({  status: 'error', error: 'User and password do not match' })
        // }
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

// router.get('/private', auth, (req, res) => {
//     res.send('You have admin acces')
// })

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.send({ status: 'Logout ERROR', body: err })
        } else {
            // res.send('Logout ok!')
            res.redirect("/")
        }
    })
})

// anterior profile sin session
// router.get('/profile/:id', async (req, res) => {
//     try {
//         const { id } = req.params
//         const user = await Users.findOne({ _id: id })

//         if (!user) {
//             return res.send('User profile not find')
//         }

//         res.render('profile', { user: user })
//     } catch (error) {
//         res.status(500).json({ error: 'User profile error' })
//     }
// })

router.get('/profile', async (req, res) => {
    const userInfo = {
        email: req.session.user.email,
    }

    const user = await Users.findOne({ email: userInfo.email })

    if (!user) {
        return res.send('User profile not find')
    }

    res.render('profile', { user: user })
})

router.get('/github', passport.authenticate('github', { scope: ['user: email'] }), (req, res) => {})

router.get('/githubCallback', passport.authenticate('github', { failureRedirect: redirectLogin }), async (req, res) => {
    req.session.user = req.user
    res.redirect(profileUrl)
})

module.exports = router