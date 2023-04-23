import { useState } from "react"

import { passwordReset } from "../data/passwordReset.js"
import "./ForgotPassword.css"

function ForgotPassword() {
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [email, setEmail] = useState("")

  function handleEmailChange(event) {
    setEmail(event.target.value)
  }

  function handlePasswordReset() {
    const resetObj = {
      email: email,
    }
    passwordReset(resetObj)
      .then((response) => {
        if (response.data.message) {
          setSuccessMessage(response.data.message)
        } else {
          setErrorMessage(response.data.error)
        }
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className="container">
      <label>Enter your email:</label>
      <input type="email" value={email} onChange={handleEmailChange} />
      <button className="resetPasswordButton" onClick={handlePasswordReset}>
        Reset Password
      </button>
      {successMessage.length !== 0 ? (
        <div className="success-div">
          <span className="success-message">{successMessage}</span>
        </div>
      ) : (
        ""
      )}
      {errorMessage.length !== 0 ? (
        <div className="success-div">
          <span className="error-message">{errorMessage}</span>
        </div>
      ) : (
        ""
      )}
    </div>
  )
}

export default ForgotPassword
