import { useNavigate } from 'react-router-dom'
import './navElements.css'
import CalendarImg from '../../images/calendar.png'

function CalendarButton() {
  const navigate = useNavigate()
  function handleCalendarNavigate() {
    navigate('/calendar')
  }
  return (
    <button className="navButton" onClick={handleCalendarNavigate}>
      <img className="navImage" src={CalendarImg} alt="View Calendar button" />
      <span className="tooltiptext">View Calendar</span>
    </button>
  )
}

export default CalendarButton
