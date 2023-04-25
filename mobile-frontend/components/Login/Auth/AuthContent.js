import { useState } from 'react'
import {
  Alert,
  StyleSheet,
  View,
  Image,
  Text,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native'
import { navigator, useNavigation } from '@react-navigation/native'

import FlatButton from '../ui/FlatButton'
import AuthForm from './AuthForm'
import { Colors } from '../../../constants/styles'

function AuthContent({ isLogin, onAuthenticate, signUpSuccessMessage }) {
  const navigation = useNavigation()

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  })

  function switchAuthModeHandler() {
    if (isLogin) {
      //.replace is an option. It disallows going backward in the UI.
      navigation.navigate('Signup')
    } else {
      navigation.navigate('Login')
    }
  }

  function submitHandler(credentials) {
    let { isLogin, username, email, confirmEmail, password, confirmPassword } =
      credentials

    // uses isLogin is passed from loginscreen component. This condition allows use to use login function in utils/auth.js
    if (isLogin) {
      onAuthenticate({ username, password })
    } else {
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
      onAuthenticate({ username, email, password })
    }
  }

  return (
    <View style={styles.authContent}>
      <ScrollView>
        <Text style={styles.heading}>Welcome to Clockwork</Text>
        <Image
          style={styles.image}
          source={require('../../../assets/home-image.png')}
        />
        <AuthForm
          isLogin={isLogin}
          onSubmit={submitHandler}
          credentialsInvalid={credentialsInvalid}
          signUpSuccessMessage={signUpSuccessMessage}
        />
        <View style={styles.buttons}>
          <FlatButton onPress={switchAuthModeHandler}>
            {isLogin ? 'Create a new user' : 'Log in instead'}
          </FlatButton>
        </View>
      </ScrollView>
    </View>
  )
}

export default AuthContent

const styles = StyleSheet.create({
  authContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
  },
  image: {
    height: 300,
    width: '100%',
  },
  heading: {
    color: 'white',
    paddingBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
})
