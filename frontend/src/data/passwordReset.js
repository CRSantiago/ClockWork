import axios from "axios"
import { buildPath } from "../utils/buildPath"

export const passwordReset = async (resetObj) => {
  console.log("resetObj")
  console.log(resetObj)
  try {
    const response = await axios.post(
      buildPath("api/v1/clockwork/requestPasswordReset"),
      resetObj
    )
    return response
  } catch (e) {
    return e
  }
}
