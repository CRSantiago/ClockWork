import Task from "../models/tasks.model.js";
import User from "../models/user.model.js";
import dayjs from 'dayjs';
import { ObjectId } from "mongodb";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

export default class TasksDAO {
    static async createTask(id, taskData, token) {
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        let jwttoken = token;
        try {
            const verified = jwt.verify(jwttoken, jwtSecretKey);
            if (verified){
              console.log("verification successful");
              const newTask = await Task.create(taskData);
              const savedTask = await newTask.save();
              console.log("TOKEN: "+token);
              console.log(savedTask.datestart);
              console.log(savedTask.datestart.getMonth()); // get month goes from 0 - 11
              // Update user
              const foundUser = await User.findOne({_id: savedTask.user});
              //  Very annoying calander update function
              //    Field is prempting the location in the string in order to access the month array
              //    it is then adding a day object in the calendar array
              let field = "calendar." + savedTask.datestart.getMonth();
              const updateUser = await User.updateOne({_id: savedTask.user},{
                $push: {[field]:{day: savedTask.datestart.getDate(), Task: savedTask._id}}
              }
              );
              console.log(updateUser);
              return savedTask.toJSON();
            }
            else{
              let error = "invalid token";
              throw error;
            }
          } catch (error) {
            console.error(`Error creating task: ${error}`);
            throw error;
          }
        }

        static async getTask(id) {
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
