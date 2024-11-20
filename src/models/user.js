
import mongoose,{Schema} from 'mongoose'

export const UserSchema = new Schema({
    username:String,
    email:{type:String,required:[true,'Email Required !!']},
    phone:{type:Number,required:[true,'Phone Required !!']},
    password:{type:String,required:[true,'Password Required']}
})

export const User = mongoose.models.gameuserlists || mongoose.model("gameuserlists",UserSchema)