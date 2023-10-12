const passport = require('passport')
const local = require('passport-local')
const Users = require('../models/users.model')
const githubStrategy = require('passport-github2')
const { getHashedPassword, comparePassword } = require('../utils/bcrypts')

const localStrategy = local.Strategy

const initializePassport = () => {
    passport.use('register', new localStrategy(
        {passReqToCallback: true, usernameField: 'email'}, async (req, username, password, done) => {
            const { first_name, last_name, email, age } = req.body

            try {
                const user = await Users.findOne({ email: username })
                if (user) {
                    console.log('User exists')
                    return done(null, false)
                }
                  
                const userInfo = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: getHashedPassword(password)
                }

                const newUser = await Users.create(userInfo)
                done(null, newUser)
            } catch (error) {
                done(`Error to create user ${error}`)
            }
        }
    ))

    passport.use('login', new localStrategy({usernameField: 'email'}, async(username, password, done) => {
            try {
                const user = await Users.findOne({ email: username })
                if(!user) {
                    console.log('User does not exist')
                    return done(null, false)
                }

                if(!comparePassword(password, user.password)) return done(null, false)

                return done(null, user)
            } catch (error) {
                done(`Login error, ${error}`)
            }
        }
    ))

    passport.use('profile', new localStrategy(async(req, done) => {
        try {
            if (!req.isAuthenticated()) {
                return done(null, false)
            } else {
                return done(null, req.user)
            }
        } catch (error) {
            return done(`Profile error, ${error}`)
        }
    }))

    passport.use('github', new githubStrategy({
        clientID: 'Iv1.ee370d4e4218bd65',
        clientSecret: '133bd0e796307eb7476ed7ad6375b65730cf07c0',
        callbackURL: 'https://clon-mlibre.vercel.app/session/githubCallback',
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile)

            const user = await Users.findOne({ email: profile._json.email })
            if(!user) {
                const userInfo = {
                    first_name: profile._json.name,
                    last_name: '',
                    email: profile._json.email,
                    age: 24,
                    password: ''
                }

                const newUser = await Users.create(userInfo)
                return done(null, newUser)
            }

            done(null, user)
        } catch (error) {
            done(error)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await Users.findById(id)
            if (!user) {
                return done(null, false)
            }
            done(null, user)
        } catch (error) {
            done(error)
        }
    })
}

module.exports = initializePassport

