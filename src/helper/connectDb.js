import { User } from "@/models/user"
import mongoose from "mongoose"
export const connectDb = async()=>{
  const {connection} =  await  mongoose.connect(process.env.mongoodb_url,{dbName:"game_web_app"})
  
 console.log(connection,'connection')
    try {
      const  newUser =await  new User({
        username:"username",
        email:"email@gmail.com",
        phone:9773583040,
        password:"password"
      })
    
      await newUser.save() 
    } catch (error) {
      console.log(error,'error')
    }

 
}