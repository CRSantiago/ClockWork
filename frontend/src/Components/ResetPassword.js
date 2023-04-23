import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { passwordReset } from '../data/passwordReset'

import './ResetPassword.css'
import './ForgotPassword.css'

function ResetPassword() {
  const navigate = useNavigate()
  const { token } = useParams()

  const [password, setPassword] = useState('') //Password default is empty
  const [confirmPassword, setPasswordConfirm] = useState('') //Password default is empty
  const [successMessage, setSuccessMessage] = useState('')
  const [feedback, setFeedBack] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

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

  function handleSubmit(event) {
    event.preventDefault()
    if (password === confirmPassword) {
      const validation = validatePassword(password)
      if (validation === true) {
        setErrorMessage('')
        setFeedBack('')
        passwordReset(token, { password: password })
          .then((response) => {
            if (response.data.message) {
              setSuccessMessage(response.data.message)
            } else {
              setErrorMessage(response.data.error)
            }
          })
          .catch((err) => console.log(err))
      } else {
        setErrorMessage(validation)
      }
    } else {
      setErrorMessage('Your passwords do not match.')
    }
  }

  function handleBackHomeRedirect() {
    navigate('/')
  }

  return (
    <form className="containerResetPassword" onSubmit={handleSubmit}>
      <label>Enter your new password:</label>
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <label>Confirm your new password:</label>
      <input
        type="password"
        onChange={(e) => setPasswordConfirm(e.target.value)}
      />
      <button type="submit" className="resetPasswordButton">
        Reset Password
      </button>
      {successMessage.length !== 0 ? (
        <div className="success-div">
          <p className="success-message">{successMessage}</p>
          <p className="success-message">
            Return to{' '}
            <a className="backHomeBtn" onClick={handleBackHomeRedirect}>
              Login
            </a>
          </p>
        </div>
      ) : (
        ''
      )}
      {errorMessage.length !== 0 ? (
        <div className="success-div">
          <span className="error-message">{errorMessage}</span>
        </div>
      ) : (
        ''
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
    </form>
  )
}

export default ResetPassword
