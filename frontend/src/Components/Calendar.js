import format from 'date-fns/format'
import getDay from 'date-fns/getDay'
import startOfWeek from 'date-fns/startOfWeek'
import React, { useState, useEffect } from 'react'
import { Calendar, dateFnsLocalizer} from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import {useNavigate}  from 'react-router-dom';
import './Calendar.css'
import {setTasks} from '../data/setTasks.js';
import LogOut from './LogOut'
import Task from './Task'

//defining our calendar locale
const locales = {
  'en-US': require('date-fns/locale/en-US'),
}

const localizer = dateFnsLocalizer({
  format,
  startOfWeek,
  getDay,
  locales,
})

function CalendarComponent() {
  //Task array
  const taskArray = [];

  const navigate = useNavigate()

  //Defining our event variables
  const [allEvents, setAllEvents] = useState(taskArray);
  const [eventsLoaded, setEventsLoaded] = useState(false)

  //defining our variables for this function
  let title
  let start
  let end
  let bufferArray
  let buffer

   //Current date variable
   var currentDate = new Date();
   var currentMonth = currentDate.getMonth();
   var currentYear = currentDate.getFullYear();

   useEffect(() => {
    setTasks().then(response =>{
      //looping through our task array for the given month
      console.log(response.data);
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

        taskArray.push({title: title, start: start, end: end});
      }
      setAllEvents(taskArray)
      setEventsLoaded(true)
      })
      .catch((error) => {
        console.error(error)
      })

    }, [eventsLoaded])

    console.log(allEvents)
  function handleAddTask(){
    navigate('/AddTask')
  }

  const taskElements = allEvents.map((task, index) => {
    return <Task key={index}/>
  })
  return (
    <div className="calendarView">
      <LogOut />
      <div className='calendarTask'>
        <div className="calendar">
          <Calendar
            localizer={localizer}
            events={allEvents}
            startAccessor="start"
            endAccessor="end"
            onSelectEvent={(data) => {
              console.log("onSelectEvent", data);
            }}
            onSelectSlot={(slotInfo) => {
              console.log(slotInfo)
            }}
            selectable
          />

          <p name="information">Information</p>
        </div>

        <div className="emptySpace">{/*Empty space for styling purposes*/}</div>

        <div className="tasks">
          <h1>{currentDate.toDateString()}</h1>
          Tasks 
          <button onClick={handleAddTask}>+</button>
          <div>
            {taskElements}
          </div> 
          <p name="notes">Notes</p>
        </div>
      </div>
    </div>
  )
}

export default CalendarComponent