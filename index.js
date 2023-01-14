const express = require('express')
const session = require('express-session')
const passport = require('passport')
const { logger, errorLogger } = require('./utils/logger')
const { ensureAuthenticated } = require('./utils/common')
require('dotenv').config()

const authRoutes = require('./routes/auth')

const app = express()

const sess = {
  secret: '42race xyz',
  cookie: {},
  resave: false,
  saveUninitialized: true
}
if (process.env.ENV === 'production') {
  app.set('trust proxy', 1) 
  sess.cookie.secure = true 
}
app.set('view engine', 'pug')
app.use(session(sess))
app.use(passport.initialize());
app.use(passport.session());

app.use(logger)
/* static files */
app.use(express.static('public'))
app.use('/authorize', authRoutes)
app.use(ensureAuthenticated)
app.use(errorLogger)


app.listen(process.env.PORT, () => {
  console.log(`42Race listening on port ${process.env.PORT}`)
})