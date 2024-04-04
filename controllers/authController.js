import { MongoClient, ObjectId } from "mongodb"
import {hashPassword} from '../service/bcryptService.js'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();

const client=new MongoClient(process.env.MONGODB_URI)
export const createUser=async(req,res)=>{
    try {
        const {name,password,email}=req.body
        if(!email || !name || !password){
            return res.json({
                statusCode:400,
                message:"Field Should be Present"
            })
        }
        if(password.length<8){
            return res.json({
                statusCode:400,
                message:"Password should at least of 8 characters"
            })
        }
        const db=client.db('TEST');
        const user=db.collection('USER')
        const isUserExist=await user.findOne({email:email})
        if(isUserExist){
            return res.json({
                statusCode:402,
                message:"User is Already Present"
            })
        }
        const hashedPassword=await hashPassword(password);
        const userItem={
            _id:new ObjectId(),
            name:name,
            password:hashedPassword,
            email:email
        }
        const createResponse=await user.insertOne(userItem)
        if(!createResponse){
            return res.json({
                statusCode:400,
                message:"User Created Failed. Try again"
            })
        }
        const payload={
            name,
            _id:userItem._id,
            email
        }
        const token=jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:'8h'})
        return res.json({
            statusCode:200,
            message:"User Created Successfully",
            token
        })
    } catch (error) {
        return res.json(
            {
                statusCode:400,
                message:error.message
            }
        )
    }
}

export const login=async(req,res)=>{
    try {
        
    } catch (error) {
        return res.json(
            {
                statusCode:400,
                message:error.message
            }
        )
    }
}

export const deleteUser=async(req,res)=>{
    try {
        console.log(req.body.user)
    } catch (error) {
        return res.json(
            {
                statusCode:400,
                message:error.message
            }
        )
    }
}