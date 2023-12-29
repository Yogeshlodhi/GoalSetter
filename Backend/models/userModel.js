import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please Enter the name'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please add your email'],
    },
    password: {
        type: String,
        required: [true, 'Please add your password'],
    },
},{
    timestamps: true,
})



const userModel = mongoose.model('User', userSchema)

export default userModel