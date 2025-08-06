import express from 'express'
import {registerUser,loginUser, userCredits} from '../controllers/userControllers.js'
import userAuth from '../middlewares/auth.js'


const userRouter = express.Router()


userRouter.post('/register',registerUser) // http://localhost:4000/api/user/register
userRouter.post('/login',loginUser) // http://localhost:4000/api/user/login
userRouter.get('/credits',userAuth,userCredits)

export default userRouter


