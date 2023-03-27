import TasksDAO from "../dao/tasksDAO.js";
import dotenv from "dotenv";


export default class TasksController{
    static async apiCreateTask(req, res, next) {
        try {
          const {id} = req.params;
          const taskData = req.body;
          console.log( "REQ HEADER: ");
          console.log(req.header("token"));
          const intoken = req.header("token");
          const savedTask = await TasksDAO.createTask(id, taskData, intoken);
          console.log(savedTask);
          res.status(200).json(savedTask);
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
      }

    static async apiGetTask(req, res, next) {

        const {id} = req.params;
        console.log(id);
        const tasks = await TasksDAO.getTask(id);

        if (tasks) {
          res.status(200).json(tasks);
        } 
        else {
          res.status(400).json({error: 'Unable to get task'});
        }
  }
    
    // static async apiUpdateTask(req, res, next) {
      
    // }

    // static async apiDeleteTask(req, res, next) {
      
    // }
}