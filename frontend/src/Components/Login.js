//Imports **NOTE** All CSS Files need to be in Component folder to use ./x.css ** NOTE**
import React, { useState} from 'react';
import './LoginPage.css';
import './Register.css';
import './Login.css';
import axios from "axios"
import {buildPath} from '../utils/buildPath'

function Login(){
    //Defining our state variables
    const [email, setEmail] = useState(""); //Email default is empty
    const [password, setPassword] = useState(""); //Password default is empty 
    const [userName, setUserName] = useState(""); //Usernae default is empty
    const [showLogin, setL] = useState(true); //Login default is true
    const [showRegister, setR] = useState(false); //Register default is fauls

    //Login function
    const LoginFunc = (event) =>
    {
        //go to a new page, just import API here and if matches input go the the next page
        event.preventDefault();
        alert(email + ' ' + password)
        const userLogin = {
            userName: userName,
            //email: email,
            password: password
        }
        
        axios.post(buildPath('api/v1/clockwork/login'), userLogin)
        .then(response => console.log(response.data))
        .catch(error => {
            console.error(error);
        });
    }

    //Register function
    const RegisterFunc = (event) =>
    {
        //Returns to login and adds user to database using api
        alert("Thank you " + userName + " Registration successful, return to login");
        //connect register API
        const userRegister = {
            email: email,
            userName: userName,
            password: password
        }
        axios.post(buildPath('api/v1/clockwork/register'), userRegister)
        .then(response => console.log(response.data))
        .catch(error => {
            console.error(error);
        });
    };

    //Function that switches login form to register form or register form to success form
    function pageSwap()
    {
       //setting login display to false
       setL(false)
       //setting registr display to true
       setR(true)
    }

    //Returning our HTML display
    return(
        //Defining our entire display window
        <div className="display">
            {/* Defining our login display, className depends on current state of the form*/}
            <div className={showLogin ? "loginDisplay" : "loginClose"}>
                {/* Image added to login page */}
                <img
                    src="https://media.gettyimages.com/id/1333130434/vector/clock.jpg?s=612x612&w=gi&k=20&c=gK6spbTR_qqhuW1wcPNUwQofbegdUQJaanytzsfeEhw="
                    alt=""
                />
                {/* Defining our form which includes our user input and the submit button */}
                <form>
                    <input
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Enter UserName"
                        type="text"
                    />

                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Enter Password"
                        type="password"
                    />

                    <button type="submit" onClick={LoginFunc}>
                        Log In
                    </button>

                    <p>
                        Need an Account?
                        <span 
                            className="Register" 
                            onClick={pageSwap}>
                            Create one Here
                        </span>
                    </p>

                </form>
            </div>

            {/*Defining our entire register display*/}
            <div className={showRegister ? "registerDisplay" : "registerClose"}>
                {/* Image added to login page */}
                <img
                    src="https://media.gettyimages.com/id/1333130434/vector/clock.jpg?s=612x612&w=gi&k=20&c=gK6spbTR_qqhuW1wcPNUwQofbegdUQJaanytzsfeEhw="
                    alt=""
                />
                {/* Defining our form which includes our user input and the submit button */}
                <form>
                    <input
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Enter Email"
                        type="text"
                    />

                    <input
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)} 
                        placeholder="Enter UserName"
                        type="text"
                    />

                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Enter Password"
                        type="password"
                    />

                    <button type="submit" onClick={RegisterFunc}>
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;