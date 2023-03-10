// Task schema for mongodb
import mongoose from "mongoose";

const Schema = mongoose.Schema;
console.log("task schema init");

const userSchema = new Schema({
	_id: String,
	taskID: String,
	 date: {
	 	type: String,
		default: Date.now() //set default
	 },
	title: String,
	description: String,
	 interval: {
		type: {
			unit: {
				type: String,
				enum: ["days", "weeks", "months"],
			
			  },
			value: {
				type: Number,		
			  },
		}
	 },
	 notes: String,
	 notify: String,
	 notifyintensity: String
}, 
{ collection : 'Task' })

const Task = mongoose.model('Task', userSchema);

export default Task;
