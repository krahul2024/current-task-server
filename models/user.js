import { Schema, model } from "mongoose";


const UserSchema = new Schema({
    name : String, 
    email : String, 
    phone : String, 
    gender : String, 
    age : Number, 
    password : String, 
    address : {
        street : String, 
        city : String, 
        state : String, 
        postalCode : String, 
    }
})

export default model('User', UserSchema); 