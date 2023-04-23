import { buildPath } from '../utils/buildPath'
import axios from 'axios'

export const deleteTask = async (taskObj) => {
  console.log(taskObj)
  try {
    const response = await axios.post(
      buildPath('api/v1/clockwork/deleteTask/'),
      taskObj,
      {
        headers: { token: localStorage.getItem('token') },
      }
    )
    return response
  } catch (e) {
    console.log(e)
  }
}
