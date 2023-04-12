import axios from 'axios'
import { buildPath } from '../utils/buildPath'
import React from 'react'

export const setTasks = async () =>
{
    //User id
    var userID = localStorage.getItem('userid');

     //Current date variable
    var currentDate = new Date();
    var currentMonth = currentDate.getMonth();
    var currentYear = currentDate.getFullYear();

    try {
    const response = axios.get(buildPath('api/v1/clockwork/getCalendar/' + userID.toString() + '/' + (currentMonth).toString()),
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        })
        return response
      } catch(e) {
        console.log(e)
      }
}