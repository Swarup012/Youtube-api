 import mongoose, {Schema} from 'mongoose'
 import bcrypt from 'bcrypt'
 import jwt from 'jsonwebtoken'

 const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    fullname:{
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar:{
        type: String,
        required: true,
    },
    coverImage:{
        type: String,
    },
    watchHistory: [
        {
            type: Schema.type.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    refreshTokens: {
        type: String
    }
 },{timestamps: true})



//here we encrypt the password
 userSchema.pre("save", async function(next) {

    if(!this.isModified("password")) return next();

    this.password =  bcrypt.hash(this.password,10)
    next()
 })

 //here we compare the password to the user password when he login 
 userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
 }

 export const User = mongoose.model("User",userSchema)