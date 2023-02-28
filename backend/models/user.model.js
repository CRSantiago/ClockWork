// User schema for mongodb
import mongoose from "mongoose";

const Schema = mongoose.Schema;
console.log("user schema init");

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
}, 
{ collection : 'Users' })

const User = mongoose.model('User', userSchema);

export default User;