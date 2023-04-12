import axios from 'axios'
import { buildPath } from '../utils/buildPath'

export const createTask = async (taskObj) => {
    console.log("taskObj")
    console.log(taskObj)
    try{
      const response = await axios.post(
        buildPath('api/v1/clockwork/createTask'), taskObj,
        { headers: { token: localStorage.getItem('token') } }
      ) 
      return response
    } catch(e){
      console.log(e)
    }
  }