import { Router } from 'express';
import { getGoals, addGoals, updateGoal, deleteGoal } from '../controllers/goalControllers.js';
import protect from '../middleware/authMiddleware.js'

const router = Router();


router.route('').get(protect ,getGoals).post(protect,addGoals)
router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal)

export default router 