import Message from '../models/message.js'
import User from '../models/user.js'

export const getIndex = async (req, res) => {
 try {
    const messages = await Message.find().populate('sender')
    const users = await User.find()
    res.render('chat/index', {
        messages: messages,
        users: users,
        path: '/',
        userId: req.user._id
    })
 } catch(err) {
    console.log(err)
 }
}

export const postMessage = async (req, res) => {
  const {messageContent} = req.body

  const message = new Message({
    sender: req.user,
    content: messageContent
  })

  try {
    await message.save()
    console.log('message has been sent')
    res.redirect('/')
  } catch (err) {
    console.log(err)
  }
}
