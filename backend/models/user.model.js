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
            {day: Number, Task: ObjectId}
        ],
        "1": [
            {day: Number, Task: ObjectId}
        ],
        "2": [
            {day: Number, Task: ObjectId}
        ],
        "3": [
            {day: Number, Task: ObjectId}
        ],
        "4": [
            {day: Number, Task: ObjectId}
        ],
        "5": [
            {day: Number, Task: ObjectId}
        ],
        "6": [
            {day: Number, Task: ObjectId}
        ],
        "7": [
            {day: Number, Task: ObjectId}
        ],
        "8": [
            {day: Number, Task: ObjectId}
        ],
        "9": [
            {day: Number, Task: ObjectId}
        ],
        "10": [
            {day: Number, Task: ObjectId}
        ],
        "11": [
            {day: Number, Task: ObjectId}
        ]
    }
}, 
{ collection : 'Users' })

const User = mongoose.model('User', userSchema);

export default User;