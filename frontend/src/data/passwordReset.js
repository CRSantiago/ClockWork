import axios from 'axios'
import { buildPath } from '../utils/buildPath'

export const passwordResetRequest = async (resetObj) => {
  console.log('resetObj')
  console.log(resetObj)
  try {
    const response = await axios.post(
      buildPath('api/v1/clockwork/requestPasswordReset'),
      resetObj
    )
    return response
  } catch (e) {
    return e
  }
}

export const passwordReset = async (token, passwordObj) => {
  console.log(passwordObj)
  try {
    const response = await axios.post(
      buildPath(`api/v1/clockwork/resetPassword/${token}`),
      passwordObj
    )
    return response
  } catch (e) {
    return e
  }
}
