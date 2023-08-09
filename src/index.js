const express = require('express')
const router = require('./routes')

const app = express()
const port = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

router(app)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})