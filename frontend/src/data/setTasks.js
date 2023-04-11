import axios from 'axios'
import { buildPath } from '../utils/buildPath'
import React from 'react'

export const setTasks = (array, userID, currentMonth, currentYear) =>
{
    //defining our variables for this function
    let title
    let start
    let end
    let bufferArray
    let buffer

    //Getting the server response using axios REMEBER TO ADDD +1 TO CURRENT MONTH, NOT ADDING AS NO TESTS IN THIS MONTH
    axios
      .get(
        buildPath('api/v1/clockwork/getCalendar/' + userID.toString() + '/' + (currentMonth).toString()),
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        })
        .then(response =>{
            //looping through our task array for the given month
            //console.log(response.data);
            for(let i = 0; i < response.data.length; i++){
            //storing the json at the current index in a buffer
            bufferArray = JSON.stringify(response.data[i]);
            //parsing the json
            buffer = JSON.parse(bufferArray);
            //setting the title to the json task
            title = buffer.title;
            //setting the start date to the current task date
            start = new Date(currentYear, (currentMonth), parseInt(buffer.day));
            //setting the end date to the current task date
            end = new Date(currentYear, (currentMonth), parseInt(buffer.day));

              array.push({title: title, start: start, end: end});
            }
            console.log(array);
        })
      .catch((error) => {
        console.error(error)
      })
}