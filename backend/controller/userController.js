const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


// route: post Route api/user/register
// location: public
// descri:  register
const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password, phoneNo} = req.body;
    if(!req.body) {
       res.status(400)
       throw new Error('please input a value')
    }

    //check if user exist
    const userExist = await User.findOne({name: name})
    if (userExist) {
        res.status(400)
        throw new Error('user exists already register')
    }

    //hash the password 
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt)

    //create new user
    const newUser = {
        name: name,
        email: email,
        phoneNo: phoneNo,
        password: hashedpassword
    }
    const user = await User.create(newUser)

    //if user is created
    user && (
        res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phoneNo: user.phoneNo,
        password: user.password
    })
    ) 
    
})


// route: post Route api/user/login
// location: public
// descri:  login
const loginUser = asyncHandler(async(req, res) => {
    const {name, password} = req.body;
    if(!req.body) {
        res.status(400)
        throw new Error('please input a value')
    }

   const user = await User.findOne({name: name})

   bcrypt.compare(password, user.password)
   .then((result) => {
       if (result) {
           res.status(200)
           res.send({
               _id: user._id,
               name: user.name,
               phoneNo: user.phoneNo,
               email: user.email,
               token: generateToken(user._id)
           })
       } else {
           res.status(401).send({ message: "Invalid credentials" });
       }
   })
   .catch((err) => {
       res.status(500).send({ message: "user not registered" + err });
   });
})

// route: get Route api/user/getme
// location: private
// descri:  getuser
const getme = asyncHandler(async(req, res) => {
    // const user = await User.findById(req.user._id)
    res.status(200).json(req.user)
    
})



// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    })
  }

module.exports = {
    registerUser,
    loginUser,
    getme,
};
