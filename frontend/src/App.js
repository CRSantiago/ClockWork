import React from 'react'
import './App.css'
import './Components/Login.css'
import LoginPage from './Pages/LoginPage'
import CalendarPage from './Pages/CalendarPage'
import AddTask from './Components/AddTask'
import TaskDetail from './Components/TaskDetail'
import EmailConfirmation from './Components/EmailConfirmation'
import ForgotPassword from './Components/ForgotPassword'
import ResetPassword from './Components/ResetPassword'
import { Route, Routes, BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/AddTask" element={<AddTask />} />
        <Route path="/TaskDetail" exact element={<TaskDetail />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/ResetPassword/:token" element={<ResetPassword />} />
        <Route path="/verified/:id" element={<EmailConfirmation />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
