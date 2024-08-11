import express from 'express'
import {getIndex, postMessage} from '../controllers/chat.js'

const route = express.Router()

route.get('/', getIndex)

route.post('/post-message', postMessage)

export default route