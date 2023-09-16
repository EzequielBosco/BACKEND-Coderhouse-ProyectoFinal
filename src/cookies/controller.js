const { Router } = require('express')

const router = Router()

router.get('/', (req, res) => {
    try {
        res.render('cookies')
    } catch (error) {
        console.log(error)
    }
})

// router.get('/set', (req, res) => {
//     res.cookie('cookieClave', 'cookieValor',{signed:true}).send('cookie firmada enviada')
// })

router.get('/get', (req, res) => {
    const cookie = req.cookies.user
    if (cookie) {
        res.send('cookie recibida: ' + cookie)
    } else {
        res.send('No se encontró una cookie')
    }
})

router.post('/submit', (req, res) => {
    const { name, text } = req.body
    res.cookie('user', name).send('cookie creada')
})

router.get('/deleteCookie', (req, res) => {
    res.clearCookie("cookieClave").send('cookie eliminada')
})

router.get('/session', (req, res) => {
    if(req.session.counter) {
        req.session.counter++
        res.send(`Se visitó el sitio ${req.session.counter} veces`)
    } else {
        req.session.counter = 1
        res.send('Bienvenido!')
    }
})

function auth(req, res, next) {
    if (req.session?.user === 'pepe' && req.session?.admin) {
      return next()
    }
    return res.status(401).send('error de autorización!')
}

router.get('/login', (req, res) => {
    const { username, password } = req.query
    if (username !== 'pepe' || password !== 'pepepass') {
      return res.send('login failed')
    }
    req.session.user = username
    req.session.admin = true
    res.send('login success!')
})

router.get('/privado', auth, (req, res) => {
    res.send('si estas viendo esto es porque ya te logueaste!')
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
   
   
   

module.exports = router