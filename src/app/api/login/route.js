import { connectDb } from "@/helper/connectDb"
import { LoginUser } from "@/models/loginUser"
import { User } from "@/models/user"
import { NextResponse } from "next/server"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
connectDb()
export async function GET(request){
try{
const user  =await LoginUser.find()
return NextResponse.json(user)
}catch(error){
    console.log(error,'error')
    return   NextResponse.json({meaasage:error.message,status:false},{status:500})
}
}


export async function POST(request){

    const  {username , password}  =await request.json()
   
                
    try{
  
 const matchuser = await User.findOne({ username })

 if(!matchuser){
    throw new Error("User was not found")
 }

 const matchedpassword = bcrypt.compareSync(password, matchuser.password);

        if (!matchedpassword) {
            throw new Error("Password Not Matched");
        }

 const token = jwt.sign({_id:matchuser._id},process.env.jwt_token,{expiresIn:'1d'})
 console.error(token,'token')
  const response = NextResponse.json({message:"Logged Success !!",status:true})  
        response.cookies.set("authToken",token,{
           maxAge:24 * 60 * 60 ,
           httpOnly:false,
           path:'/' 
        })
        
       
 const login = new LoginUser({ username, password });
        await login.save();

        return response
    }catch(error){
        console.log(error,'error')
        return    NextResponse.json({meaasage:error.message,status:false},{status:500})
    }
    }
