/*
  Common
*/
import express from 'express'
import path from 'path'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import passport from 'passport'
import cors from 'cors'

/*
  Database Import
*/
import Database from './src/config/database'

/*
  Import Endpoints
  Ex : import student from './src/routes/Student.Router'
*/
import user from './src/routes/User.Router'
import auth from './src/routes/Auth.Router'
import patient from './src/routes/Patient.Router'

/*
	middleware
*/
import PassportMiddleware from './src/middleware/Passport.Middleware'
const protect = new PassportMiddleware(passport)
protect.protect()

let app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors());
/*
  [Database conection] -> refactor
*/
const conn = new Database('local')
/*
  routes to student resource
  ex: app.use('/student', student)
*/
app.use('/auth/', auth);
app.use('/user/', user)
app.use('/patient', patient)
// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500);
  res.render('error')
})

var port = process.env.PORT || 3000

app.listen(port, () => {
	console.log('Listening on ' + port)
})

export default app