import express from 'express'
import { createUser, deleteUser, login } from '../controllers/authController.js';
import { requireSignIn } from '../middleware/authMiddleware.js';

const authRouter=express.Router();

authRouter.post('/auth/create',createUser)
authRouter.post('/auth/login',login)
authRouter.delete('/auth/delete',requireSignIn, deleteUser)

export default authRouter;