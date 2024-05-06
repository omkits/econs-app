const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please add name'],
    },
    email: {
        type: String,
        required: [true, 'please add email'],
    },
    phoneNo: {
        type: Number,
        required: [true, 'please add number'],
    },
    password: {
        type: String,
        required: [true, 'please add passsword'],
    },
},
{
    timestamps: true
}
)

module.exports = mongoose.model('User', UserSchema)