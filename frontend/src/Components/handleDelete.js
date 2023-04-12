import React from "react";
import { deleteTask } from "../data/deleteTask";
import './Calendar'

export const handleDelete = (id) => {
   // const [visible, setVisible] = useState(false);
    const deleteTaskHandler = deleteTask(() => {
        const taskCopy = [...taskArray]
        //let copy = [...this.state.taskArray]
        taskCopy.splice(id, 1)
        setTask(taskCopy)
    }, []);
 
   return (
        <button onClick = {deleteTaskHandler}>-</button>
    );
 }