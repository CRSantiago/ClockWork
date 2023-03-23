import { useState } from 'react'
import AuthContent from '../components/Login/Auth/AuthContent'
import LoadingOverLay from '../components/Login/ui/LoadingOverlay'
import { createUser } from '../util/auth'

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  async function signupHandler({ username, email, password }) {
    setIsAuthenticating(true)
    await createUser(username, email, password)
    setIsAuthenticating(false)
  }

  if (isAuthenticating) {
    return <LoadingOverLay message="Creating user..." />
  } else {
    return <AuthContent onAuthenticate={signupHandler} />
  }
}

export default SignupScreen
