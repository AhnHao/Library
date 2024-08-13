import bcrypt from 'bcryptjs'
import User from '../models/user.js'

export const getLogin = (req, res) => {
  res.render('auth/login')
}

export const postLogin = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({email: email})
    const doMatch = await bcrypt.compare(password, user.password)
    if(doMatch) {
      req.session.user = user
      req.session.isLoggedIn = true
      return req.session.save(err => {
        console.log(err)
        res.redirect('/index')
      })
    }
  } catch(err) {
    console.log(err)
  }
}

export const getSignup = (req, res) => {
  res.render('auth/signup')
}

export const postSignup = async (req, res) => {
  const { username, email, password } = req.body
  const image = req.file
  const avatarImageUrl = image.path.replace(/\\/g, "/")

  try {
    const hashedPassword = await bcrypt.hash(password, 12)

    const user = new User({
      username: username,
      email: email,
      avatarImageUrl: avatarImageUrl,
      password: hashedPassword
    })
    await user.save()
    res.redirect('/')
  } catch (err) {
    console.log(err)
  }
}