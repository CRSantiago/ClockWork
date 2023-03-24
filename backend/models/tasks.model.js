// Task schema for mongodb
import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const Schema = mongoose.Schema;
console.log("task schema init");

const taskSchema = new Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		default: mongoose.Types.ObjectId // assign a new ObjectId as default
	},
	user:{
		type: ObjectId
	},

	date: {
		type: Date,
		default: Date.now()
	},
	title: String,
	description: String,
	interval: {
			unit: {
				type: String,
				enum: ["days", "weeks", "months"],
			
			  },
			value: {
				type: Number,		
			  }
	 },
	 notes: String,
	 notify: String,
	 notifyintensity: {
		type: String,
		enum: ["none", "mild", "moderate", "urgent"]
	 },
}, 
{ collection : 'Tasks' })


const Task = mongoose.model('Tasks', taskSchema);

export default Task;
