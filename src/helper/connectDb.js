
import { User } from "@/models/user"
import mongoose from "mongoose"



export const connectDb = async()=>{
    const config = {isConnected:0}

    try{
        const {connection} =await mongoose.connect(process.env.mongoodb_url,{  dbName : "game_web_app"})
        config.isConnected = connection.readyState
    // console.warn(connection,'check i will gget readystate value it will whenever  any api url is hit')

// const usersave  = new User({
//   username:"kirti",
//     email:"kirti@gmail.com",
//     phone:9745581242,
//     password:"kirti",
   
// })
// await usersave.save()

    }catch(error){
        console.error("failed to connect db","failed to connect db")
        console.log(error,'error')
    }
}