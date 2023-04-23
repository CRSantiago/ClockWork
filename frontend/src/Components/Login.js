//Imports **NOTE** All CSS Files need to be in Component folder to use ./x.css ** NOTE**
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './LoginPage.css'
import './Register.css'
import './Login.css'
import './LoginButtons.css'
import axios from 'axios'
import { buildPath } from '../utils/buildPath'
import validator from 'validator'
import LoginImage from '../images/LoginImage.png'

function Login() {
  const navigate = useNavigate()

  //Defining our state variables
  const [errorMessage, setErrorMessage] = useState('')
  const [email, setEmail] = useState('') //Email default is empty
  const [password, setPassword] = useState('') //Password default is empty
  const [confirmEmail, setEmailConfirm] = useState('') //Email default is empty
  const [confirmPassword, setPasswordConfirm] = useState('') //Password default is empty
  const [feedback, setFeedBack] = useState('')
  const [username, setUserName] = useState('') //Usernae default is empty
  const [showDisplay, setD] = useState({
    loginD: true,
    registerD: false,
    forgotD: false,
    registerSuccess: false,
  }) //display state
  const [selected, Sel] = useState({
    login: true,
    register: false,
    forgot: false,
  }) //Selector button state
  const [isRegistered, setIsRegistered] = useState(false)

  //Login function
  const LoginFunc = (event) => {
    //go to a new page, just import API here and if matches input go the the next page
    event.preventDefault()
    const userLogin = {
      username: username,
      password: password,
    }

    axios
      .post(buildPath('api/v1/clockwork/login'), userLogin)
      .then((response) => {
        if (response.data.error !== '') {
          setErrorMessage(response.data.error)
        } else {
          navigate('/')
        }

        let authToken = response.data.token
        if (authToken.length !== 0) {
          localStorage.setItem('token', authToken)
          localStorage.setItem('userid', response.data._id)
          navigate('/calendar')
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const passwordRegex =
    /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/

  function validatePassword(passwordTest) {
    if (!passwordRegex.test(passwordTest)) {
      const feedback = []
      if (!/(?=.*[a-z])/.test(passwordTest)) {
        feedback.push('at least one lowercase letter')
      }
      if (!/(?=.*[A-Z])/.test(passwordTest)) {
        feedback.push('at least one uppercase letter')
      }
      if (!/(?=.*\d)/.test(passwordTest)) {
        feedback.push('at least one number')
      }
      if (!/(?=.*[!@#$%^&*])/.test(passwordTest)) {
        feedback.push('at least 1 special character')
      }
      if (password.length < 8) {
        feedback.push('at least 8 characters')
      }
      setFeedBack(feedback)
      return false
    }
    return true
  }

  //Register function
  const RegisterFunc = (event) => {
    //Returns to login and adds user to database using api
    event.preventDefault()
    let emailIsValid = false
    if (validator.isEmail(email)) {
      emailIsValid = true
    }

    const passwordIsValid = validatePassword(password)
    const emailsAreEqual = email === confirmEmail
    const passwordsAreEqual = password === confirmPassword

    if (
      !emailIsValid ||
      !passwordIsValid ||
      !emailsAreEqual ||
      !passwordsAreEqual
    ) {
      if (!emailIsValid) {
        setErrorMessage('You entered an invalid email. Please try again.')
      } else if (!emailsAreEqual) {
        setErrorMessage(
          'The emails you entered do not match. Please try again.'
        )
      } else if (!passwordsAreEqual) {
        setErrorMessage(
          'The passwords you entered do not match. Please try again.'
        )
      } else {
        setErrorMessage('')
      }

      return
    }

    const userRegister = {
      email: email,
      username: username,
      password: password,
    }
    axios
      .post(buildPath('api/v1/clockwork/register'), userRegister)
      .then((response) => {
        //Printing data to console for testing
        console.log(response.data)
        if (response.data.error === '') {
          //Updating our display state
          setD({
            loginD: true,
            registerD: false,
            forgotD: false,
            registerSuccess: true,
          })
          //Setting our selector back to login for user to login with new credentials
          setIsRegistered(true)
          setErrorMessage('')
          setFeedBack('')
          //send email
          axios
            .get(buildPath(`api/v1/clockwork/verify/${email}`))
            .then((response) => console.log(response))
        } else {
          setFeedBack('')
          setErrorMessage(response.data.error)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  //Function that switches login form to register form or register form to success form
  const selectorSwap = (toSwap) => {
    if (toSwap === 'login') {
      Sel({ login: true, register: false, forgot: false })
      setD({
        loginD: true,
        registerD: false,
        forgotD: false,
        registerSuccess: false,
      })
      setErrorMessage('')
    } else if (toSwap === 'register') {
      Sel({ login: false, register: true, forgot: false })
      setD({
        loginD: false,
        registerD: true,
        forgotD: false,
        registerSuccess: false,
      })
      setErrorMessage('')
    }
  }

  function navigateForgotPassword() {
    navigate('/forgotPassword')
  }

  //Returning our HTML display
  return (
    //Defining our entire display window
    <div className="display">
      {/* Image added to login page */}
      <div className="loginImage">
        <img src={LoginImage} alt="" />
      </div>

      {/* Defining our login display, className depends on current state of the form*/}
      <div className={showDisplay.loginD ? 'loginDisplay' : 'loginClose'}>
        {/* Defining our form which includes our user input and the submit button */}

        <div className="selectors">
          <button
            name={selected.login ? 'selected' : 'goToLogin'}
            type="button"
            onClick={() => selectorSwap('login')}
          >
            Login
          </button>

          <button
            name={selected.register ? 'selected' : 'goToRegister'}
            type="button"
            onClick={() => selectorSwap('register')}
          >
            Register
          </button>
        </div>

        <div className="loginf">
          {isRegistered && (
            <div>
              <h3 className="registerSuccesful">
                Thank you for registering {username}
              </h3>
              <p className="registerSuccesful">
                Please check your email to verify your account before logging in
              </p>
            </div>
          )}
          <h1 className="loginFormText">Enter login below</h1>

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

          <button
            className="forgotPasswordBtn"
            onClick={navigateForgotPassword}
          >
            Forgot password?
          </button>

          {errorMessage.length !== 0 ? (
            <div className="error-div">
              <span className="error-message">{errorMessage}</span>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>

      {/*Defining our entire register display*/}
      <div
        className={showDisplay.registerD ? 'registerDisplay' : 'registerClose'}
      >
        {/* Defining our form which includes our user input and the submit button */}
        <div className="selectors">
          <button
            name={selected.login ? 'selected' : 'goToLogin'}
            type="button"
            onClick={() => selectorSwap('login')}
          >
            Login
          </button>

          <button
            name={selected.register ? 'selected' : 'goToRegister'}
            type="button"
            onClick={() => selectorSwap('register')}
          >
            Register
          </button>
        </div>

        <div className="registerf">
          <h1 className="registerFormText">Register below</h1>

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

          {errorMessage.length > 0 && (
            <div className="error-div">
              <span className="error-message">{errorMessage}</span>
            </div>
          )}
          {feedback.length > 0 && (
            <div className="feedback-div">
              <p>The password does not meet the following criteria:</p>
              <ul>
                {feedback.map((message, index) => (
                  <li key={index}>{message}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
