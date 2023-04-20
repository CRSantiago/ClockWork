import React from "react"
import "./App.css"
import "./Components/Login.css"
import LoginPage from "./Pages/LoginPage"
import CalendarPage from "./Pages/CalendarPage"
import AddTask from "./Components/AddTask"
import TaskDetail from "./Components/TaskDetail"
import EmailConfirmation from "./Components/EmailConfirmation"
import { Route, Routes, BrowserRouter } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<LoginPage />} />
        <Route path="/calendar" index element={<CalendarPage />} />
        <Route path="/AddTask" index element={<AddTask />} />
        <Route path="/TaskDetail" index element={<TaskDetail />} />
        <Route path="verified/:id" index element={<EmailConfirmation />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
