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

   //Current date variable
   var currentDate = new Date();
   var currentMonth = currentDate.getMonth();
   var currentYear = currentDate.getFullYear();

  const navigate = useNavigate()

  //Defining our event variables
  const [allEvents, setAllEvents] = useState(taskArray);
  const [eventsLoaded, setEventsLoaded] = useState(false)
  const [currDate, setCurrDate] = useState(currentDate)
  const [taskElements, setTaskElements] = useState([])

  //defining our variables for this function
  let title
  let start
  let end
  let bufferArray
  let buffer

   useEffect(() => {
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
      }
      // after api call, set initial variables
      setAllEvents(taskArray)
      setEventsLoaded(true)
      const initTaskElementsFiltered = allEvents.filter(task => 
        task.start.getDate() === currDate.getDate()
      )
      const initialTaskElements = initTaskElementsFiltered.map((task, index) => {
        return <Task key={index} task={task}/>
      })
      setTaskElements(initialTaskElements)
      // end of variable initialization
      }) // end of then
      .catch((error) => {
        console.error(error)
      })

    }, [eventsLoaded])

  //console.log(allEvents)
  function handleAddTask(){
    navigate('/AddTask')
  }

  /*
    Takes in a date selected in calendar ui. 
    Based on the input, we then filter the allEvents to update the Task displayed in panel to reflect those task
  */
  function handleDateChange(date){
    const newTaskElementsFiltered = allEvents.filter(task => 
      task.start.getDate() === date.getDate()
    )
    const newTaskElements = newTaskElementsFiltered.map((task, index) => {
      return <Task key={index} task={task}/>
    })
    setTaskElements(newTaskElements)
    setCurrDate(date)
  }

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
              // console.log("onSelectEvent", data.start);
              handleDateChange(data.start)
            }}
            onSelectSlot={(slotInfo) => {
              console.log(slotInfo.start)
            }}
            selectable
          />

          <p name="information">Information</p>
        </div>

        <div className="emptySpace">{/*Empty space for styling purposes*/}</div>

        <div className="tasks">
          <h1>{currDate.toDateString()}</h1>
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