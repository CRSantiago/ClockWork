//Imports **NOTE** All CSS Files need to be in Component folder to use ./x.css ** NOTE**
import React, { useState} from 'react';
import './LoginPage.css';
import './Register.css';
import './Login.css';
import './LoginButtons.css';
import axios from "axios"
import {buildPath} from '../utils/buildPath'

function Login(){
    //Defining our state variables
    const [email, setEmail] = useState(""); //Email default is empty
    const [password, setPassword] = useState(""); //Password default is empty 
    const [username, setUserName] = useState(""); //Usernae default is empty
    //const[user, setUser] = useState({username: "", password: "", email: ""}); //User state, default is empty object
    const [showDisplay, setD] = useState({loginD: true, registerD: false, forgotD: false, registerSuccess: false}); //display state
    const [selected, Sel] = useState({login: true, register: false, forgot: false}); //Selector button state

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
            else{
                alert("Logged in as: " + username);
            }
        })
        .catch(error => {
            console.error(error);
        });
    }

    //Register validation function
    /*function submitHandler(credentials) {
        let { email, confirmEmail, password, confirmPassword } = credentials
    
        email = email.trim()
        password = password.trim()
    
        const emailIsValid = email.includes('@')
        const passwordIsValid = password.length > 6
        const emailsAreEqual = email === confirmEmail
        const passwordsAreEqual = password === confirmPassword
    
        if (
          !emailIsValid ||
          !passwordIsValid ||
          (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
        ) {
          Alert.alert('Invalid input', 'Please check your entered credentials.')
          setCredentialsInvalid({
            email: !emailIsValid,
            confirmEmail: !emailIsValid || !emailsAreEqual,
            password: !passwordIsValid,
            confirmPassword: !passwordIsValid || !passwordsAreEqual,
          })
          return
        }
       // else then all is valid  then authenticate
      }*/

    //Register function
    const RegisterFunc = (event) =>
    {
        //Returns to login and adds user to database using api
        event.preventDefault();
        const userRegister = {
            email: email,
            username: username,
            password: password
        }
        axios.post(buildPath('api/v1/clockwork/register'), userRegister)
        .then(response => {
            //Printing data to console for testing 
            console.log(response.data)
            //Updating our display state
            setD({loginD: false, registerD: false, forgotD: false, registerSuccess: true})
            //Setting our selector back to login for user to login with new credentials 
            
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

                    <button name={selected.forgot ? "selected" : "goToForgot"} type="button" onClick={() => selectorSwap("forgot")}>
                        Forgot?
                    </button>
                </div>

                <div className='loginf'> 
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

                    <button name={selected.forgot ? "selected" : "goToForgot"} type="button" onClick={() => selectorSwap("forgot")}>
                        Forgot?
                    </button>
                </div>

                <div className='registerf'> 
                    <h1 className='registerFormText'>Register below</h1>

                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Enter Email"
                        type="text"
                    />

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

                    <button name="selected" type="submit" onClick={RegisterFunc}>
                        Register
                    </button>
                </div>

            </div>
            {/*Forgot display*/}

            {/*Successful register display*/}
            <div className={showDisplay.registerSuccess ? "registrationSuccess" : "successHidden"}>
                <div className="thankYou">
                    Thank you for Registering {username}!
                    <p>
                        <button name="selected" type="button" onClick={LoginFunc}>
                            Login
                        </button>
                    </p>
                </div>
            </div>

        </div>
    );
}

export default Login;