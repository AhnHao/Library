import express from 'express'
import {getIndex} from '../controllers/message.js'

const route = express.Router()

route.get('/', getIndex)

export default route