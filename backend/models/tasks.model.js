// Task schema for mongodb
import mongoose from "mongoose";

const Schema = mongoose.Schema;
console.log("task schema init");

const userSchema = new Schema({
	_id: String,
	date: String,
	title: String,
	descritpion: String,
	interval: String,
	intervaltype:[
		{
			type: "Xdays",
            value: Int
		},
		{
			type: "Xweeks",
            value: Int
		},
		{
			type: "Xmonths",
            value: Int
		}
	],
	notes: String,
	notify: String,
	notifyintensity: String
}, 
{ collection : 'Task' })

const Task = mongoose.model('Task', userSchema);

export default User;