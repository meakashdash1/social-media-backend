import { MongoClient, ObjectId } from "mongodb"
import {hashPassword} from '../service/bcryptService.js'
import jwt from 'jsonwebtoken';
const client=new MongoClient("mongodb+srv://aradhanatripathy92:Aeadhana00@cluster0.sd3ozlo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
export const createUser=async(req,res)=>{
    try {
        const {name,password,email}=req.body
        const hashedPassword=await hashPassword(password);
        const userItem={
            _id:new ObjectId(),
            name:name,
            password:hashedPassword,
            email:email
        }
        const db=client.db('TEST');
        const user=db.collection('USER')
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
        const token=jwt.sign(payload,'djkjskks',{expiresIn:'8h'})
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

export const deleteUser=async(req,res)=>{
    try {
        console.log("User Deleted")
    } catch (error) {
        return res.json(
            {
                statusCode:400,
                message:error.message
            }
        )
    }
}