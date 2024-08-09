import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config()

const connectDB = async () => {
    try {
       await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      console.log('Database connected')
    } catch (err) {
        console.log(err)
    }
} 

export default connectDB