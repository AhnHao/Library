import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import url from 'url'
import connectDB from './config/database.js'
import messageRoute from './routes/chat.js'
import authRoute from './routes/auth.js'

import User from './models/user.js'

import dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT || 8080

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
  User.findById('66b8a7bbad7c8dfef298b3da')
    .then(user => {
      req.user = user
      next()
    })
    .catch(err => console.log(err))
})

app.use(messageRoute)
app.use(authRoute)

connectDB()
app.listen(port, () => {
  console.log(`sever is running on  ${port}`)
})
