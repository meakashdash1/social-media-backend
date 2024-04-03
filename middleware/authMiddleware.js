import jwt from 'jsonwebtoken'
export const requireSignIn=(req,res,next)=>{
    try {
        const token=req.headers.authorization;
        if(!token){
            return res.json({
                statusCode:400,
                message:"Token Unavailable"
            })
        }
        const decode=jwt.verify(token,'djkjskks')
        console.log(decode)
        if(!decode){
            return res.json({
                statusCode:400,
                message:"Unauthorized"
            })
        }
        req.body.user=decode;
        next();
    } catch (error) {
       console.log(error.message)
       throw error; 
    }
}