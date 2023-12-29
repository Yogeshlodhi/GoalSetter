import asyncHandler from 'express-async-handler'

import Goals from '../models/goalModel.js';
import User from '../models/userModel.js';

const getGoals = asyncHandler(async (req,res) => {
    const goals = await Goals.find({user: req.user.id})
    res.status(200).json(goals)
    // res.send('Getting all the goals')
})

const addGoals = asyncHandler(async (req,res) => {

    // const {name} = req.body;

    if(!req.body.name){
        res.status(404)
        throw new Error('Please add a text value')
    }

    const goal = await Goals.create({
        name: req.body.name,
        user: req.user.id
    });

    res.status(200).json(goal)
    // res.send('Goal Added')
})

const updateGoal = asyncHandler(async (req,res) => {
    const goal = await Goals.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal Not Found')
    }

    const user = await User.findById(req.user.id);

    if(!user){
        res.status(401)
        throw new Error('User Not Found')
    }

    //  checking for logged in user and goal user to be same
    if(goal.user.toString() !== user.id){
        res.status(401);
        throw new Error('User Not Authorized')
    }

    const updatedGoal = await Goals.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedGoal)
    // res.status(200).json({message : `Goal Updated for ${req.params.id}`})
})

const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goals.findById(req.params.id)

    
    const user = await User.findById(req.user.id);

    
    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }
    
    if(!user){
        res.status(401)
        throw new Error('User Not Found')
    }

    //  checking for logged in user and goal user to be same
    if(goal.user.toString() !== user.id){
        res.status(401);
        throw new Error('User Not Authorized')
    }

    // await goal.remove()
    await Goals.deleteOne({ _id: req.params.id });
  
    res.status(200).json({ id: req.params.id })
  })

export {
    getGoals,
    addGoals,
    updateGoal,
    deleteGoal,
}