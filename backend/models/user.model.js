// User schema for mongodb
import mongoose from "mongoose";

const Schema = mongoose.Schema;
console.log("user schema init");

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    /*calender: [
        {
            month: "january",
            days : [
                {
                    _id: 0,
                    Tasks:[
                    ]
                }
            ]
        },
        {
            month: "febuary",
            days : [
                {
                    _id: 0,
                    Tasks:[
                    ]
                }
            ]
        },
        {
            month: "march",
            days : [
                {
                    _id: 0,
                    Tasks:[
                    ]
                }
            ]
        },
        {
            month: "april",
            days : [
                {
                    _id: 0,
                    Tasks:[
                    ]
                }
            ]
        },
        {
            month: "may",
            days : [
                {
                    _id: 0,
                    Tasks:[
                    ]
                }
            ]
        },
        {
            month: "june",
            days : [
                {
                    _id: 0,
                    Tasks:[
                    ]
                }
            ]
        },
        {
            month: "july",
            days : [
                {
                    _id: 0,
                    Tasks:[
                    ]
                }
            ]
        },
        {
            month: "august",
            days : [
                {
                    _id: 0,
                    Tasks:[
                    ]
                }
            ]
        },
        {
            month: "september",
            days : [
                {
                    _id: 0,
                    Tasks:[
                    ]
                }
            ]
        },
        {
            month: "november",
            days : [
                {
                    _id: 0,
                    Tasks:[
                    ]
                }
            ]
        },
        {
            month: "december",
            days : [
                {
                    _id: 0,
                    Tasks:[
                    ]
                }
            ]
        }
    ]*/
}, 
{ collection : 'Users' })

const User = mongoose.model('User', userSchema);

export default User;