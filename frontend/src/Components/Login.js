//Imports **NOTE** All CSS Files need to be in Component folder to use ./x.css ** NOTE**
import React, { useState} from 'react';
import './LoginPage.css';
import './Register.css';
import './Login.css';
import './LoginButtons.css';
import axios from "axios"
import {buildPath} from '../utils/buildPath'
/*import emailV from './emailValidation';
import Password from './passwordValidation';*/
import validator from "validator";


function Login(){
    //Defining our state variables
    const [email, setEmail] = useState(""); //Email default is empty
    const [password, setPassword] = useState(""); //Password default is empty
    const [confirmEmail, setEmailConfirm] = useState(""); //Email default is empty
    const [confirmPassword, setPasswordConfirm] = useState(""); //Password default is empty 
    const [username, setUserName] = useState(""); //Usernae default is empty
    const [showDisplay, setD] = useState({loginD: true, registerD: false, forgotD: false, registerSuccess: false}); //display state
    const [selected, Sel] = useState({login: true, register: false, forgot: false}); //Selector button state
    const [isRegistered, setIsRegistered] = useState(false);
    //const [message, setMessage] = useState("");

    //Login function
    const LoginFunc = (event) =>
    {
        //go to a new page, just import API here and if matches input go the the next page
        event.preventDefault();
        const userLogin = {
            username: username,
            password: password
        }
        
        axios.post(buildPath('api/v1/clockwork/login'), userLogin)
        .then(response => {
            console.log(response.data)
            if(response.data.error !== ""){
                alert(response.data.error);
            }
            // else{
            //     alert("Logged in as: " + username);
            // }
        })
        .catch(error => {
            console.error(error);
        });
    }

    //Register function
    const RegisterFunc = (event) =>
    {
        console.log("in RegisterFunc()")
        //Returns to login and adds user to database using api
        event.preventDefault();  
        let emailIsValid = false  
        if (validator.isEmail(email)) {
           //setMessage('Valid Email')
           emailIsValid = true
        } 
       
        const passwordIsValid = password.length > 6
        const emailsAreEqual = email === confirmEmail
        const passwordsAreEqual = password === confirmPassword
    
        if (!emailIsValid || !passwordIsValid || ( (!emailsAreEqual || !passwordsAreEqual)))
        {
            alert('Invalid input - Please check your entered credentials.')
        //   setCredentialsInvalid({
        //     email: !emailIsValid,
        //     confirmEmail: !emailIsValid || !emailsAreEqual,
        //     password: !passwordIsValid,
        //     confirmPassword: !passwordIsValid || !passwordsAreEqual,
        //   })
            return
        }
        const userRegister = {
            email: email,
            username: username,
            password: password
        }
        axios.post(buildPath('api/v1/clockwork/register'), userRegister)
        .then(response => {
            //Printing data to console for testing 
            console.log(response.data)
            if(response.data.error === ''){
                //Updating our display state
                setD({loginD: true, registerD: false, forgotD: false, registerSuccess: true})
                //Setting our selector back to login for user to login with new credentials 
                setIsRegistered(true)
            } else {
                alert(`${response.data.error}`)
            }
            
        })
        .catch(error => {
            console.error(error);
        });
    };

    //Function that switches login form to register form or register form to success form
    const selectorSwap = (toSwap) =>
    {
        if(toSwap === "login"){
            Sel({login: true, register: false, forgot: false})
            setD({loginD: true, registerD: false, forgotD: false, registerSuccess: false})
        }
        else if(toSwap === "register"){
            Sel({login: false, register: true, forgot: false})
            setD({loginD: false, registerD: true, forgotD: false, registerSuccess: false})
        }
        else if(toSwap === "forgot")
        {
            Sel({login: false, register: false, forgot: true})
            setD({loginD: false, registerD: false, forgotD: true, registerSuccess: false})
        }
    }

    //Returning our HTML display
    return(
        //Defining our entire display window
        <div className="display">
            {/* Image added to login page */}
            <div className='loginImage'>
                <img
                        src="https://cdn.discordapp.com/attachments/1079547041123946627/1087805510134280322/image_1.png"
                        alt=""
                />
            </div>

            {/* Defining our login display, className depends on current state of the form*/}
            <div className={showDisplay.loginD ? "loginDisplay" : "loginClose"}>
                {/* Defining our form which includes our user input and the submit button */}

                <div className="selectors">
                    <button name={selected.login ? "selected" : "goToLogin"} type="button" onClick={() => selectorSwap("login")}>
                        Login
                    </button>

                    <button name={selected.register ? "selected" : "goToRegister"} type="button" onClick={() => selectorSwap("register")}>
                        Register
                    </button>

                    {/*<button name={selected.forgot ? "selected" : "goToForgot"} type="button" onClick={() => selectorSwap("forgot")}>
                        Forgot?
                    </button>*/}
                </div>

                <div className='loginf'> 
                {isRegistered && <h3 className='registerSuccesful'>Thank you for registering {username}</h3>}
                    <h1 className='loginFormText'>Enter login below</h1>

                    <input
                        value={username} 
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

                    <button name="selected" type="submit" onClick={LoginFunc}>
                        Log In
                    </button>
                </div>
            </div>

            {/*Defining our entire register display*/}
            <div className={showDisplay.registerD ? "registerDisplay" : "registerClose"}>
                {/* Defining our form which includes our user input and the submit button */}
                <div className="selectors">
                    <button name={selected.login ? "selected" : "goToLogin"} type="button" onClick={() => selectorSwap("login")}>
                        Login
                    </button>

                    <button name={selected.register ? "selected" : "goToRegister"} type="button" onClick={() => selectorSwap("register")}>
                        Register
                    </button>

                    {/*<button name={selected.forgot ? "selected" : "goToForgot"} type="button" onClick={() => selectorSwap("forgot")}>
                        Forgot?
                    </button>*/}
                </div>

                <div className='registerf'> 
                    <h1 className='registerFormText'>Register below</h1>

                    <input
                        value={username}
                        onChange={(e) => setUserName(e.target.value)} 
                        placeholder="Enter UserName"
                        type="text"
                    />

                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Enter Email"
                        type="text"
                    />

                    <input
                        value={confirmEmail}
                        onChange={(e) => setEmailConfirm(e.target.value)} 
                        placeholder="Confirm Email"
                        type="text"
                    /> 

                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Enter Password"
                        type="password"
                    />
                    <input
                        value={confirmPassword}
                        onChange={(e) => setPasswordConfirm(e.target.value)} 
                        placeholder="Confirm Password"
                        type="password"
                    /> 

                    <button name="selected" type="submit" onClick={RegisterFunc}>
                        Register
                    </button>
                </div>

            </div>
            {/*Forgot display*/}

            {/*Successful register display*/}

        </div>
    );
}

export default Login;