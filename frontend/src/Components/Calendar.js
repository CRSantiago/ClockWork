import format from 'date-fns/format'
import getDay from 'date-fns/getDay'
//import parseISO from "date-fns/parseISO";
import { parseISO } from 'date-fns'
import startOfWeek from 'date-fns/startOfWeek'
import React, { useState, useEffect } from 'react'
import { Calendar, dateFnsLocalizer, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import axios from 'axios'
import { buildPath } from '../utils/buildPath'
import './Calendar.css'
import {setTasks} from '../data/setTasks.js';
import LogOut from './LogOut'
import {useNavigate}  from 'react-router-dom';

//defining our calendar locale
const locales = {
  'en-US': require('date-fns/locale/en-US'),
}

//
const localizer = dateFnsLocalizer({
  format,
  parseISO,
  startOfWeek,
  getDay,
  locales,
})

function Main() {
  const navigate = useNavigate()
  //Defining our event variables
  //const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState([])
  const [tasks, setTask] = useState({ taskName: '', description: '' })

  //Current date variable
  var currentDate = new Date();
  var currentMonth = currentDate.getMonth();
  var currentYear = currentDate.getFullYear();

  //Task array
  var taskArray = [];

  //User id
  var userID = localStorage.getItem('userid');

  //Function to get task title from task information
  /*const getTaskTitle = async (id) => {
    let jsonbuffer
    let parsed
    let tasktitle
    try {
      const response = await axios.get(
        buildPath('api/v1/clockwork/getTask/' + id),
        { headers: { token: localStorage.getItem('token') } }
      )
      jsonbuffer = JSON.stringify(response.data[0])
      parsed = JSON.parse(jsonbuffer)
      tasktitle = parsed.title
      return tasktitle
    } catch (error) {
      console.log(error)
    }
  }*/

  //Setting our calendar to the user default from the database
  /*const setCalendar = (array) => {
    //defining our variables for this function
    let title
    let start
    let end
    let bufferArray
    let buffer

    //Getting the server response using axios REMEBER TO ADDD +1 TO CURRENT MONTH, NOT ADDING AS NO TESTS IN THIS MONTH
    axios
      .get(
        buildPath(
          'api/v1/clockwork/getCalendar/' +
            userID.toString() +
            '/' +
            (currentMonth).toString()
        ),
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        }
      )
      // .then(async response =>{
      //   //looping through our task array for the given month
      //   for(let i = 0; i < response.data.length; i++){
      //     //storing the json at the current index in a buffer
      //     bufferArray = JSON.stringify(response.data[i]);
      //     //parsing the json
      //     buffer = JSON.parse(bufferArray);
      //     //setting the title to the json task
      //     title = buffer.Task;
      //     title = await getTaskTitle(title);
      //     //setting the start date to the current task date
      //     start = new Date(2023, (currentMonth), parseInt(buffer.day));
      //     //setting the end date to the current task date
      //     end = new Date(2023, (currentMonth), parseInt(buffer.day));

      //     array.push({title: title, start: start, end: end});
      //   }
      //   console.log(array);
      // })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.error(error)
      })
  }*/

  //initiating our events state
  useEffect(() => {
    //setCalendar(taskArray)
    //setAllEvents(taskArray)
    //Calling the setTasks functinon to fill the calendar
    setTasks(taskArray, userID, currentMonth, currentYear);
    //Updating state
    setAllEvents(taskArray);
  }, [])

  function handleAddTask(){
    navigate('/AddTask')
  }

  return (
    <div className="calendarView">
      <LogOut />
      <div className="calendar">
        <Calendar
          localizer={localizer}
          events={allEvents}
          startAccessor="start"
          endAccessor="end"
        />

        <p name="information">Information</p>
      </div>

      <div className="emptySpace">{/*Empty space for styling purposes*/}</div>

      <div className="tasks">
        <h1>{currentDate.toDateString()}</h1>
        Tasks
        <button onClick={handleAddTask}>+</button>
        <p name="notes">Notes</p>
      </div>
    </div>
  )
}

export default Main
