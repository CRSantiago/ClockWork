// User schema for mongodb
import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const Schema = mongoose.Schema;
console.log("user schema init");

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    isVerified: {
        type: Boolean,
        default: false
    },
    uniqueString: String,
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    calendar: {
        "0": [
            {day: Number, Task: ObjectId, title: String, description: String}
        ],
        "1": [
            {day: Number, Task: ObjectId, title: String, description: String}
        ],
        "2": [
            {day: Number, Task: ObjectId, title: String, description: String}
        ],
        "3": [
            {day: Number, Task: ObjectId, title: String, description: String}
        ],
        "4": [
            {day: Number, Task: ObjectId, title: String, description: String}
        ],
        "5": [
            {day: Number, Task: ObjectId, title: String, description: String}
        ],
        "6": [
            {day: Number, Task: ObjectId, title: String, description: String}
        ],
        "7": [
            {day: Number, Task: ObjectId, title: String, description: String}
        ],
        "8": [
            {day: Number, Task: ObjectId, title: String, description: String}
        ],
        "9": [
            {day: Number, Task: ObjectId, title: String, description: String}
        ],
        "10": [
            {day: Number, Task: ObjectId, title: String, description: String}
        ],
        "11": [
            {day: Number, Task: ObjectId, title: String, description: String}
        ]
    }
}, 
{ collection : 'Users' })

const User = mongoose.model('User', userSchema);

export default User;