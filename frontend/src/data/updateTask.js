import { buildPath } from '../utils/buildPath'
import axios from 'axios'

export const updateTask = async (taskObj) => {
  console.log(taskObj)
  try {
    const response = await axios.patch(
      buildPath(
        'api/v1/clockwork/updateTask/' + taskObj.user + '/' + taskObj.task_id
      ),
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
