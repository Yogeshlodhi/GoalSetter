import mongoose from "mongoose";

const goalSchema = mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: {
        type: String,
        required: [true, 'Please add the goal Name']
    },
},{
    timestamps: true,
})

const goalModel = mongoose.model('Goals', goalSchema)

export default goalModel