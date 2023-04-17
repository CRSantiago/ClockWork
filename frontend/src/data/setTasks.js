import axios from 'axios'
import { buildPath } from '../utils/buildPath'
import React from 'react'

export const setTasks = async (currMonth) => {
  //User id
  var userID = localStorage.getItem('userid')

  try {
    const response = axios.get(
      buildPath(
        'api/v1/clockwork/getCalendar/' +
          userID.toString() +
          '/' +
          currMonth.toString()
      ),
      {
        headers: {
          token: localStorage.getItem('token'),
        },
      }
    )
    return response
  } catch (e) {
    console.log(e)
  }
}
