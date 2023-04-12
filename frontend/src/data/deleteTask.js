import React from "react";
import { buildPath } from "../utils/buildPath";
import axios from "axios";

export const deleteTask = async (taskObj) => {
    console.log(taskObj)
    try{
        const response = await axios.get(
            buildPath('api/v1/clockwork/deleteTask/'), taskObj,
            {   
                headers: { token: localStorage.getItem('token') }
                /*body: JSON.stringify({id: 'id'}, {taskId: 'taskId'})
                id: 'id', 
                taskId: 'taskId'
                */ 
            }
        ) 
        return response
    }catch(e){
        console.log(e)
    }
}