import { useState } from 'react'
import { Alert } from 'react-native'

import LoadingOverLay from '../components/Login/ui/LoadingOverlay'
import { login } from '../util/auth'
import AuthContent from '../components/Login/Auth/AuthContent'

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  async function loginHandler({ username, password }) {
    setIsAuthenticating(true)
    try {
      const response = await login(username, password)
      if (response.data.error !== '') {
        Alert.alert(
          'Authentication failed!',
          `Could not log you in. ${response.data.error}`
        )
      }
    } catch (error) {
      console.log(error)
    }
    setIsAuthenticating(false)
  }

  if (isAuthenticating) {
    return <LoadingOverLay message="Logging in..." />
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />
}

export default LoginScreen
