import express from 'express'
import {getIndex, postMessage} from '../controllers/chat.js'
import { isAuth } from '../middleware/authmiddleware.js'

const route = express.Router()

route.get('/index',isAuth, getIndex)

route.post('/post-message', postMessage)

export default route