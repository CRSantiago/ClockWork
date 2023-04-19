import { useNavigate } from "react-router-dom"

function EmailConfirmation() {
  const navigate = useNavigate()
  function handleClick() {
    navigate("/")
  }
  return (
    <div>
      <p>Thank you for confirming your email!</p>
      <p>
        You may now <a onClick={handleClick}> login</a>
      </p>
    </div>
  )
}

export default EmailConfirmation
