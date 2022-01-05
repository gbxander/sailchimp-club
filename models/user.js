const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        first: {
            type: String,
            required: true
        },
        last: {
            type: String
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

module.export = User