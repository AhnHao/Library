import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import multer from 'multer'
import session from 'express-session'
import MongoStore from 'connect-mongo'

// core modules
import path from 'path'
import url from 'url'

// database connect
import connectDB from './config/database.js'

// route
import messageRoute from './routes/chat.js'
import authRoute from './routes/auth.js'

// model
import User from './models/user.js'

// enviroment
import dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT || 8080

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// app
const app = express()

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/avatar')
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    )
  }
})

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|jfif/
  const mimetype = filetypes.test(file.mimetype)
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())

  if (mimetype && extname) {
    return cb(null, true)
  } else {
    cb('Error: image is wrong format')
  }
}

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('avatar')
)
app.use(session({
  secret: 'my-secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ 
    mongoUrl: process.env.MONGODB_URI,
     collectionName: 'sessions'
  }),
  cookie: { maxAge: 1000 * 60 * 60 }
}))

app.use((req, res, next) => {
  if (!req.session.user) {
    return next()
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user
      next()
    })
    .catch(err => console.log(err))
})

app.use(authRoute)
app.use(messageRoute)

connectDB()
app.listen(port, () => {
  console.log(`sever is running on  ${port}`)
})
