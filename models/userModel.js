import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String, required: true, trim: true},
    email:{type:String, required: true, trim: true},
    password:{type:String, required: true, trim: true},
    tc:{type:Boolean, required: true}
})

const userModel = new mongoose.model('authuser', userSchema)

export default userModel