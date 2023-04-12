import React from "react";
import './App.css';
import './Components/Login.css';
import LoginPage from "./Pages/LoginPage";
import CalendarPage from "./Pages/CalendarPage";
import AddTask from "./Components/AddTask";
import { Route, Routes, BrowserRouter} from "react-router-dom";

function App()
{
  return(   
    <BrowserRouter>
      <Routes>
        <Route path='/' index element={<LoginPage/>}/>
        <Route path='/calendar' index element={<CalendarPage/>} />
        <Route path='/AddTask' index element={<AddTask/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;