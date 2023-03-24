import TasksDAO from "../dao/tasksDAO.js";


export default class TasksController{
    static async apiCreateTask(req, res, next) {
        try {
          const {id} = req.params;
          const taskData = req.body;
          const savedTask = await TasksDAO.createTask(taskData);
          console.log(savedTask);
          res.status(200).json(savedTask);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
      }

    static async getTasks(req, res, next) {

        const {id} = req.params;
        const tasks = await TasksDAO.getTasks(id);

        if (tasks) {
        res.status(200).json(tasks);
        } 
        else {
        res.status(400).json({error: 'Unable to get tasks'});
        }
  }
    
    // static async updateTask(req, res, next) {
      
    // }

    // static async deleteTask(req, res, next) {
      
    // }
}