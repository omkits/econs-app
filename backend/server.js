const express = require('express');
require('dotenv').config()
const colors = require('colors')
const connectDB = require('./config/db')
const {errorHandler}= require('./middleware/errormiddleware')
const PORT = process.env.PORT || 5000;


const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler)

connectDB()


const userRoute = require('./Routes/userRoute')
const productRoute = require('./Routes/productsRoute')
const cartRoute = require('./Routes/cartRoute')


app.use('/api/user', userRoute)
app.use('/api/products', productRoute)
app.use('/api/cart', cartRoute)

app.get('/', (req, res) => {
    res.status(200).json('working')
})

// Serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
  
    app.get('*', (req, res) =>
      res.sendFile(
        path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
      )
    );
  } else {
    app.get('/', (req, res) => res.send('Please set to production'));
  }




app.listen(PORT , (req, res) => {
    console.log(`app runing on port ` + PORT)
})