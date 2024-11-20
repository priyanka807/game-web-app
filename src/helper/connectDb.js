import mongoose from "mongoose"
export const connectDb = async()=>{
  const {connection} =  await  mongoose.connect(process.env.mongoodb_url,{dbName:"game_web_app"})
  // console.log(connection,'connection')
}