import express from 'express'
import cors from 'cors'
import authRouter from './router/authRouter.js';

const app=express();

app.use(express.json())
app.use(cors())

const routes=[
    authRouter
]

routes.forEach((route)=>{
    app.use(route)
})

app.listen(8000,()=>{
    console.log(`Server listens at port 8000`)
})