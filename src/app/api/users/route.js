import { connectDb } from "@/helper/connectDb";
import { User } from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
connectDb()
const users = [{username:'priyanka',email:'pk796395@gmail.com',phone:9773583040,password:'password'},
    {username:'harpareet',email:'aashwaani@gmail.com',phone:9658741258,password:'password'},
    {username:'doli',email:'pk796395@gmail.com',phone:9773583040,password:'password'}
]

export async function GET(){
try{
await  User.find()
return NextResponse.json(users)
}catch(error){
return NextResponse.json({message:"failed to get users ",status:"false"},{status:500})
}

}

export async function POST(request){
    const {username,email,phone,password} =await request.json()
    
    const  newUser = new User({username,email,phone,password})
    if(newUser.username===""||newUser.email===""||newUser.phone===""||newUser.password===""){
         throw new Error("All fields are required .Please filled them in")
    }
    const existingUser = await User.findOne({ username })
    if(existingUser){
if(existingUser.username===username){
    throw new Error("This username is already in use ")
}
    }

    newUser.password = bcrypt.hashSync(password,parseInt(process.env.bcrypt_salt))
    await newUser.save()
    try{
        return NextResponse.json({newUser,status:"200"})
    }catch(error){
        console.log(error,'error')
       return NextResponse.json({message:error,status:"false"},{status:500}) 
    }
}




