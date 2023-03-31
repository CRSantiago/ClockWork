import format from "date-fns/format";
import getDay from "date-fns/getDay";
//import parseISO from "date-fns/parseISO";
import { parseISO } from 'date-fns'
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
import axios from "axios"
import {buildPath} from '../utils/buildPath'
import './Calendar.css';
import LogOut from "./LogOut";

//defining our calendar locale
const locales = {
    "en-US": require("date-fns/locale/en-US"),
};

//
const localizer = dateFnsLocalizer({
    format,
    parseISO,
    startOfWeek,
    getDay,
    locales,
});

//Events to add to our calendar
const events = [
    {
        title: "Big Meeting",
        allDay: true,
        //interval: "5",
        start: new Date(2023, 2, 25),
        end: new Date(2023, 2, 25),

        /*Fields from backend
        date: start date,
        interval: 
        end date: 

        */
    },
    {
        title: "Vacation",
        start: new Date(2023, 2, 27),
        end: new Date(2023, 2, 27),
    },
    {
        title: "Conference",
        start: new Date(2023, 2, 25),
        end: new Date(2023, 2, 25),
    },
];


function Main()
{
    //Defining our event variables 
    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
    const [allEvents, setAllEvents] = useState(events);

    //Current date variable
    var currentDate = new Date();

    //Function to add an event
    function handleAddEvent() {
        
        /*for (let i=0; i<allEvents.length; i++){

            const d1 = new Date (allEvents[i].start);
            const d2 = new Date(newEvent.start);
            const d3 = new Date(allEvents[i].end);
            const d4 = new Date(newEvent.end);

             if (
              ( (d1  <= d2) && (d2 <= d3) ) || ( (d1  <= d4) &&
                (d4 <= d3) )
              )
            {   
                alert("CLASH"); 
                break;
             }
    
        }*/
        
        setAllEvents([...allEvents, newEvent]);
    }

    /*function addEvent(input, type){
        if(type === "title"){
            setNewEvent({title: title});
        }
        else if(type === "start"){
            setNewEvent({})
        }
    }*/
    
    //for testing purposes
    function test(){
        var date = parseISO("2023-06-03");
        console.log(date)
    }
    
    function setDate(input){

    }

    return(
        <div className="calendarView">
            <LogOut />
            <div className="calendar">
                
                <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end"  />

                <p name="information">
                    Information
                </p>
            </div>

            <div className="emptySpace">
                {/*Empty space for styling purposes*/}
            </div>

            <div className="tasks">
                <h1>
                    {currentDate.toDateString()}
                </h1>
                Tasks

                <p name="notes">
                    Notes
                </p>
            </div>

        </div>
    );
}

export default Main;