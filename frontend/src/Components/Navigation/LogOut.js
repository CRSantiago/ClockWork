import React from "react";
import { useNavigate } from "react-router-dom";

import logOutImg from '../../images/logout.png'
import './navElements.css'

export default function LogOut() {
    const navigate = useNavigate()
    function handleLogOut() {
        localStorage.setItem("token", null);
        localStorage.setItem("userid", null);
        navigate("/")
    }

    return (
        <>
            <button className='navButton' onClick={handleLogOut}><img className='navImage' src={logOutImg} alt='Logout button'/><span className="tooltiptext">Logout</span></button>
        </>
    );
}
