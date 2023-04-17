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
                let val = savedTask.interval.value;
                let currentDate = new Date(savedTask.datestart);
                if (savedTask.interval.unit == 'weeks'){
                  val = val*7;
                }
                  while(currentDate < savedTask.dateend){
                    console.log("POPULATE Month: "+currentDate.getMonth()+" Date: "+ currentDate.getDate());

                    let field = "calendar." + currentDate.getMonth();
                    const updateUser = await User.updateOne({_id: savedTask.user},{
                      $push: {[field]:{day: currentDate.getDate(), Task: savedTask._id, title: savedTask.title, description: savedTask.description, _id: finderId}}
                    }
                    );

                    if (savedTask.interval.unit == 'months'){
                      currentDate.setMonth(currentDate.getMonth() + val);
                    }
                    else{
                      currentDate.setDate(currentDate.getDate() + val);
                    }
                }
                console.log("done");
              }
              else{
                let field = "calendar." + savedTask.datestart.getMonth();
                const updateUser = await User.updateOne({_id: savedTask.user},{
                  $push: {[field]:{day: savedTask.datestart.getDate(), Task: savedTask._id, title: savedTask.title, description: savedTask.description, _id: finderId}}
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

        static async getTask(id, token) {
          let jwtSecretKey = process.env.JWT_SECRET_KEY;
          let jwttoken = token;
            try {
                const verified = jwt.verify(jwttoken, jwtSecretKey);
                if (verified){
                  const tasks = await Task.find({_id: id});
                  return tasks;
                }
              } catch (error) {
                console.error(error);
                return null;
              }
            }

        static async updateTask(id, taskId, taskData, token) 
        {
            console.log("updating task...");
            console.log(taskData);
            let jwtSecretKey = process.env.JWT_SECRET_KEY;
            let jwttoken = token;
            try {
              const verified = jwt.verify(jwttoken, jwtSecretKey);
              if (verified) {
                const updatedTask = await Task.updateOne({ _id: taskId, user: id }, { $set: taskData });
                if (updatedTask.nModified === 0) {
                  throw new Error('Unable to update the task');
                }
                // REMOVE TASKS FROM CALANDER
                const foundTask = await Task.find({ _id: taskId, user: id });
                let currentDate = new Date(foundTask[0].datestart);
                while (currentDate < foundTask[0].dateend){
                  let field = "calendar." + currentDate.getMonth();
                  console.log(foundTask[0].foreignid);
                  const deletedTaskCalendar = await User.updateMany({ _id: id}, {$pull: {[field]: {_id: {$in: foundTask[0].foreignid}}}});
                  console.log("deleting...");
                  console.log(deletedTaskCalendar);
                  currentDate.setMonth(currentDate.getMonth() + 1);
                }
                // POPULATE REGULAR TASKS AGAIN
                const isRegular = (taskData.interval.unit == 'days' || taskData.interval.unit == 'weeks' || taskData.interval.unit == 'months');
                if (isRegular){ 
                  console.log("start interval population");
                  let val = new Number(taskData.interval.value);
                  let currentDate = new Date(taskData.datestart);
                  let endDate = new Date(taskData.dateend);
                  console.log(currentDate);
                  console.log(taskData.dateend);
                  if (taskData.interval.unit == 'weeks'){
                    val = val*7;
                  }
                  while(currentDate < endDate){
                      console.log("POPULATE Month: "+currentDate.getMonth()+" Date: "+ currentDate.getDate());
                      let field = "calendar." + currentDate.getMonth();
                      const updateUser = await User.updateOne({_id: taskData.user},{
                        $push: {[field]:{day: currentDate.getDate(), Task: taskData._id, title: taskData.title, description: taskData.description, _id: foundTask[0].foreignid}}
                      }
                      );
  
                      if (taskData.interval.unit == 'months'){
                        currentDate.setMonth(currentDate.getMonth() + val);
                      }
                      else{
                        currentDate.setDate(currentDate.getDate() + val);
                      }
                    }
                  }
                return updatedTask;
              }
              else{
                let error = "invalid token";
                throw error;
              }
            }catch (error) {
              console.error(error);
              //res.status(500).json(error);
              }
        }

        static async deleteTask(id, taskId, token) 
        {
          let jwtSecretKey = process.env.JWT_SECRET_KEY;
          let jwttoken = token;
          console.log(taskId);
          console.log(id);
          try 
          {
            const verified = jwt.verify(jwttoken, jwtSecretKey);
            if (verified) {
              const foundTask = await Task.find({ _id: taskId, user: id });
              const deletedTask = await Task.deleteOne({ _id: taskId, user: id });
              if (deletedTask.deletedCount == 0) 
              {
                throw new Error('Unable to delete the task');
              }
              let currentDate = new Date(foundTask[0].datestart);
              while (currentDate < foundTask[0].dateend){
                let field = "calendar." + currentDate.getMonth();
                const deletedTaskCalendar = await User.updateMany({ _id: id}, {$pull: {[field]: {_id: {$in: foundTask[0].foreignid}}}});
                console.log("deleting...");
                console.log(deletedTaskCalendar);
                currentDate.setMonth(currentDate.getMonth() + 1);
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
