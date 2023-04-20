import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./EmailConfirmation.css"

function EmailConfirmation() {
  const navigate = useNavigate()

  function handleClick() {
    navigate("/")
  }
  return (
    <div className="container">
      <p>Thank you for confirming your email!</p>
      <p>
        You may now <a onClick={handleClick}> login</a>
      </p>
    </div>
  )
}

export default EmailConfirmation
