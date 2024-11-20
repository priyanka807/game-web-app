import mongoose,{Schema} from "mongoose";


export const LoginUserSchema = new  Schema({
    username:{type:String,required:[true,"Username Required !!"]},
    password:{type:String,required:[true,"Password Required !!"]}
})


export const  LoginUser  = mongoose.models.loginusers || mongoose.model("loginusers",LoginUserSchema)




