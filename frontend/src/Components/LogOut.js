import React from "react";

export default function LogOut() {
    function handleLogOut() {
        localStorage.setItem("token", null);
        window.location.href = '/';
    }

    return (
        <>
            <button className='LogOutButton' onClick={handleLogOut}>LogOut</button>
        </>
    );
}
