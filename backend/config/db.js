const mongoose = require('mongoose')

const connectDB = async() => {
    try {
       const connect = await mongoose.connect('mongodb://0.0.0.0:27017/eUsersdb')

       console.log(`Mongogb connected:  ${connect.connection.host}`.cyan.underline)

    } catch (error) {
        console.log('error from db' + error)
        process.exit(1)
    }
}

module.exports = connectDB