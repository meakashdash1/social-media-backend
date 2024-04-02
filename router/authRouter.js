import express from 'express'
import { createUser, deleteUser } from '../controllers/authController.js';

const authRouter=express.Router();

authRouter.post('/auth/create',createUser)
authRouter.delete('/auth/delete',deleteUser)

export default authRouter;