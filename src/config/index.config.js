require('dotenv').config()

module.exports = {
    port: process.env.PORT || 8080,
    db: {
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
    }
}