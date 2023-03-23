import axios from 'axios'

import { buildPath } from './buildPath'

export async function createUser(username, email, password) {
  const newUser = {
    username: username,
    email: email,
    password: password,
  }
  try {
    const response = await axios.post(
      buildPath('api/v1/clockwork/register'),
      newUser
    )
  } catch (error) {
    console.log(error)
  }
}
