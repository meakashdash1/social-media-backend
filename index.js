import express from 'express'
import cors from 'cors'
import authRouter from './router/authRouter.js';
import dotenv from 'dotenv'

dotenv.config()

const app=express();

app.use(express.json())
app.use(cors())

const routes=[
    authRouter
]

routes.forEach((route)=>{
    app.use(route)
})

app.listen(process.env.PORT,()=>{
    console.log(`Server listens at port ${process.env.PORT}`)
})