import express from 'express';
import dotenv from 'dotenv';
import goalRoutes from './routes/goalRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import colors from 'colors';
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const app = express()
const port = process.env.PORT || 4000

app.use(errorHandler)

app.use(express.json())
app.use(express.urlencoded({extended: false}))



app.use('/api/goals', goalRoutes);
app.use('/api/users', userRoutes);

app.listen(port, () => console.log(`App is running fine at ${port}`))