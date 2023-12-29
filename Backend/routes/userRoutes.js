import { Router } from 'express';
import {registerUser, loginUser, userProfile} from '../controllers/userControllers.js'
import protect from '../middleware/authMiddleware.js';

const router = Router();

router.post('', registerUser )

router.post('/login', loginUser)
router.get('/profile', protect, userProfile)

export default router