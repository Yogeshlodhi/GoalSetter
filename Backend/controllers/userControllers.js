import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js'

const registerUser = asyncHandler(async (req,res) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }

    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('User Already Exists')
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    })
    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    }else{
        res.status(400)
        throw new Error('Invalid User Data')
    }
    // res.send('Register User')
})

const loginUser = asyncHandler(async (req,res) => {
    const { email, password } = req.body

    // Check for user email
    const user = await User.findOne({ email })
  
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid credentials')
    }
})

const userProfile = asyncHandler(async (req,res) => {
    // const {_id, name, email} = await User.findById(req.user.id)
    // res.status(200).json({
    //     id: _id,
    //     name,
    //     email,
    // })
    res.status(200).json(req.user)
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    })
}


export {
    registerUser,
    loginUser,
    userProfile,
}