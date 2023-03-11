// Task schema for mongodb
import mongoose from "mongoose";

const Schema = mongoose.Schema;
console.log("task schema init");

const taskSchema = new Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		default: mongoose.Types.ObjectId // assign a new ObjectId as default
	},

	date: {
		type: String,
		default: Date.now()
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
	 notifyintensity: {
		type: String,
		enum: ["none", "mild", "moderate", "urgent"]
	 },
}, 
{ collection : 'Task' })


const Task = mongoose.model('Task', taskSchema);

export default Task;
