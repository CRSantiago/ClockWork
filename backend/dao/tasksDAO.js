import Task from "../models/tasks.model.js";

export default class TasksDAO {

    static async createTask(id, taskData) {
        try {
            const newTask = await Task.create(id, taskData);
            const savedTask = await newTask.save();
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
