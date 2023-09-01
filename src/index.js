require('dotenv').config()
const realTimeServer = require('./realTimeServer')
const app = require('./app')
const router = require('./router')

const port = process.env.port || 8080

router(app)

const httpServer = app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

realTimeServer(httpServer)