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

/*const events = [
  {
      title: "Big Meeting",
      allDay: true,
      start: new Date(2021, 6, 0),
      end: new Date(2021, 6, 0),
  },
  {
      title: "Vacation",
      start: new Date(2021, 6, 7),
      end: new Date(2021, 6, 10),
  },
  {
      title: "Conference",
      start: new Date(2021, 6, 20),
      end: new Date(2021, 6, 23),
  },
];*/

function CalendarComponent() {
  const navigate = useNavigate()
  //Defining our event variables
  //const [allEvents, setAllEvents] = useState(events)

  //Task array
  const taskArray = [];

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

   //call it here
   setTasks().then(response =>{
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

    taskArray.push({title: title, start: start, end: end});
      //setAllEvents(prevState => [...prevState, {title: title, start: start, end: end}]);
    }
    // console.log(array);
})
  .catch((error) => {
    console.error(error)
  })

  const [allEvents, setAllEvents] = useState(taskArray);
  
  //initiating our events state
  /*useEffect(() => {
    setTasks().then(response =>{
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

      taskArray.push({title: title, start: start, end: end});
        //setAllEvents(prevState => [...prevState, {title: title, start: start, end: end}]);
      }
      // console.log(array);
  })
    .catch((error) => {
      console.error(error)
    })
    //Updating state
    //setAllEvents(taskArray);
  }, [])*/

  function handleAddTask(){
    navigate('/AddTask')
  }

  var currentDate = new Date();

  console.log(allEvents)
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