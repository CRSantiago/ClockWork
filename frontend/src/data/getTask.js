import axios from 'axios'
import { buildPath } from '../utils/buildPath'

export const getTask = async (id) => {
  try {
    const response = await axios.get(
      buildPath('api/v1/clockwork/getTask/' + id),
      { headers: { token: localStorage.getItem('token') } }
    )
    return response
  } catch (error) {
    console.log(error)
  }
}
