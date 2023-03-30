// Task schema for mongodb
import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const Schema = mongoose.Schema;
console.log("task schema init");

// Add list of calander id's in schema
// This way, tasks can be searched easily when deleting or updating a task

const taskSchema = new Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		default: mongoose.Types.ObjectId // assign a new ObjectId as default
	},
	user:{
		type: ObjectId
	},

	datestart: {
		type: Date,
		default: Date.now()
	},
	dateend: {
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
