import Task from "../models/tasks.model.js";
import User from "../models/user.model.js";
import dayjs from 'dayjs';
import { ObjectId } from "mongodb";
import dotenv from "dotenv";
import { randomUUID } from "crypto";
import jwt from "jsonwebtoken";

export default class TasksDAO {
    static async createTask(id, taskData, token) {
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        let jwttoken = token;
        try {
            const verified = jwt.verify(jwttoken, jwtSecretKey);
            if (verified){
              console.log("verification successful");
              
              let finderId = new ObjectId();
              let insertId = {'foreignid': finderId};
              Object.assign(taskData, insertId); // This adds the finder/foreign id into the task document

              const newTask = await Task.create(taskData);
              const savedTask = await newTask.save();
              // Update user
              const foundUser = await User.findOne({_id: savedTask.user});
              //  Very annoying calander update function
              //    Field is prempting the location in the string in order to access the month array
              //    it is then adding a day object in the calendar array
              const isRegular = (savedTask.interval.unit == 'days' || savedTask.interval.unit == 'weeks' || savedTask.interval.unit == 'months');
              if (isRegular){ // POPULATE REGULAR TASKS
                console.log("start interval population");
                let currentDate = savedTask.datestart;
                  while(currentDate < savedTask.dateend){
                    console.log("POPULATE Month: "+currentDate.getMonth()+" Date: "+ currentDate.getDate());

                    let field = "calendar." + currentDate.getMonth();
                    const updateUser = await User.updateOne({_id: savedTask.user},{
                      $push: {[field]:{day: currentDate.getDate(), Task: savedTask._id, _id: finderId}}
                    }
                    );

                    currentDate.setDate(currentDate.getDate() + savedTask.interval.value);
                  }
                console.log("done");
              }
              else{
                let field = "calendar." + savedTask.datestart.getMonth();
                const updateUser = await User.updateOne({_id: savedTask.user},{
                  $push: {[field]:{day: savedTask.datestart.getDate(), Task: savedTask._id, _id: finderId}}
                }
                );
                console.log(updateUser);
              }
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

        static async updateTask(id, taskId, taskData, token) 
        {
            let jwtSecretKey = process.env.JWT_SECRET_KEY;
            let jwttoken = token;
            try {
              const verified = jwt.verify(jwttoken, jwtSecretKey);
              if (verified) {
                const updatedTask = await Task.updateOne({ _id: taskId, user: id }, { $set: taskData });
                if (updatedTask.nModified === 0) {
                  throw new Error('Unable to update the task');
                }
                return updatedTask;
              }
              else{
                let error = "invalid token";
                throw error;
              }
            }catch (error) {
              console.error(error);
              res.status(500).json(error);
              }
        }

        static async deleteTask(id, taskId, token) 
        {
          let jwtSecretKey = process.env.JWT_SECRET_KEY;
          let jwttoken = token;
          try 
          {
            const verified = jwt.verify(jwttoken, jwtSecretKey);
            if (verified) {
              const deletedTask = await Task.deleteOne({ _id: taskId, user: id });
              if (deletedTask.deletedCount === 0) 
              {
                throw new Error('Unable to delete the task');
              }
              return deletedTask;
            }
            else{
              let error = "invalid token";
              throw error;
            } 
            
          } catch (error) 
          {
            console.error(`Error deleting task: ${error}`);
            throw error;
          }
        }

}
