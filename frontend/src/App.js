import React from 'react'
import './App.css'
import './Components/Login.css'
import LoginPage from './Pages/LoginPage'
import CalendarPage from './Pages/CalendarPage'
import AddTask from './Components/AddTask'
import TaskDetail from './Components/TaskDetail'
import { Route, Routes, BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<LoginPage />} />
        <Route path="/calendar" index element={<CalendarPage />} />
        <Route path="/AddTask" index element={<AddTask />} />
        <Route path="/TaskDetail" index element={<TaskDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
