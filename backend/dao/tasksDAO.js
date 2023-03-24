import Task from "../models/tasks.model.js";
import User from "../models/user.model.js";
import dayjs from 'dayjs';
import { ObjectId } from "mongodb";

export default class TasksDAO {

    static async createTask(id, taskData) {
        try {
            const newTask = await Task.create(id, taskData);
            const savedTask = await newTask.save();
            //console.log(dayjs(1679340071267/*'2023-04-20'*/).daysInMonth());
            console.log(savedTask.date);
            console.log(savedTask.date.getMonth()); // get month goes from 0 - 11
            // Update user
            const foundUser = await User.findOne({_id: savedTask.user});
            //console.log(foundUser.calendar[savedTask.date.getMonth()]);
            let feild = "calendar." + savedTask.date.getMonth();
            const updateUser = await User.updateOne({_id: savedTask.user},{
              $push: {[feild]:{day: savedTask.date.getDate(), Task: savedTask._id}}
            }
            );
            console.log(updateUser);
            return savedTask.toJSON();
          } catch (error) {
            console.error(`Error creating task: ${error}`);
            throw error;
          }
        }

        static async getTasks(id) {
            try {
                const tasks = await Task.find({_id: id});
                return tasks;
              } catch (error) {
                console.error(error);
                return null;
              }
            }

        // static async updateTask(id, taskId, task) {
            
        //     }

        //static async deleteTask(id, taskId) {
            
        //}

}
