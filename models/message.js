import mongoose from "mongoose";

const Schema = mongoose.Schema

const messageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: String
}, {timestamps: true})

const MessageModel = mongoose.model('Message', messageSchema)

export default MessageModel