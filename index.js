import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import url from 'url'
import connectDB from './config/database.js'
import messageRoute from './routes/message.js'
import dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT || 8080

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use(messageRoute)

connectDB()
app.listen(port, () => {
    console.log(`sever is running on  ${port}`)
})