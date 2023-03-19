// User schema for mongodb
import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const Schema = mongoose.Schema;
console.log("user schema init");

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    calendar: {
        january: {
            days : [
                {
                    day: 0,
                    Tasks:[
                    ]
                }
            ]
        },
        february: {
            days : [
                {
                    day: 0,
                    Tasks:[
                    ]
                }
            ]
        },
        march: {
            days : [
                {
                    day: 0,
                    Tasks:[
                    ]
                }
            ]
        },
        april: {
            days : [
                {
                    _id: 0,
                    Tasks:[
                    ]
                }
            ]
        },
        may: {
            days : [
                {
                    day: 0,
                    Tasks:[
                    ]
                }
            ]
        },
        june: {
            days : [
                {
                    day: 0,
                    Tasks:[
                    ]
                }
            ]
        },
        july: {
            days : [
                {
                    _id: 0,
                    Tasks:[
                    ]
                }
            ]
        },
        august: {
            days : [
                {
                    day: 0,
                    Tasks:[
                    ]
                }
            ]
        },
        september: {
            days : [
                {
                    day: 0,
                    Tasks:[
                    ]
                }
            ]
        },
        october: {
            days : [
                {
                    day: 0,
                    Tasks:[
                    ]
                }
            ]
        },
        november: {
            days : [
                {
                    day: 0,
                    Tasks:[
                    ]
                }
            ]
        },
        december: {
            days : [
                {
                    day: 0,
                    Tasks:[
                    ]
                }
            ]
        }
    }
}, 
{ collection : 'Users' })

const User = mongoose.model('User', userSchema);

export default User;