import express from 'express'
import { getLogin } from '../controllers/auth.js'

const route = express.Router()

route.get('/login', getLogin)

export default route