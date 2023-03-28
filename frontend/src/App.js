import React from "react";
import './App.css'
import './Components/Login.css'
import LoginPage from "./Pages/LoginPage";
import CalendarPage from "./Pages/CalendarPage";

function App()
{
  return(
    // Route herf="Login"
    // <Auth isLogin/>
    // Route herf="Sign"
    // <Auth />

    /*Swap commenting out login page and calendar page while editing until routing is implemted*/

    //<LoginPage />
    <CalendarPage />
  );
}

export default App;