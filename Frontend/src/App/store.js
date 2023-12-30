import {configureStore} from '@reduxjs/toolkit'
import {authReducer} from '../Features/Auth/authSlice'
import { goalReducer } from '../Features/goals/goalSlice'

export const store = configureStore({
    reducer: {
       auth: authReducer,
       goals: goalReducer,
    },
})

