import express from 'express'
import { getLogin, postLogin, getSignup, postSignup } from '../controllers/auth.js'

const route = express.Router()

route.get('/', getLogin)

route.post('/login', postLogin)

route.get('/signup', getSignup)

route.post('/signup', postSignup)

export default route