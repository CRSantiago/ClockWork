import React from "react";
import './App.css';
import './Components/Login.css';
import LoginPage from "./Pages/LoginPage";
import CalendarPage from "./Pages/CalendarPage";
import { Route, Routes, BrowserRouter} from "react-router-dom";

function App()
{
  return(   
    <BrowserRouter>
      <Routes>
        <Route path='/' index element={<LoginPage/>}/>
        <Route path='/calendar' index element={<CalendarPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;