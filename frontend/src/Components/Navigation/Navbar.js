import { useState } from 'react'

import LogOut from './LogOut'
import CalendarButton from './CalendarButton'
import AddTaskButton from './AddTaskButton'
import './navElements.css'

function Navbar() {
  return (
    <nav className="nav">
      <CalendarButton />
      <AddTaskButton />
      <LogOut />
    </nav>
  )
}

export default Navbar
