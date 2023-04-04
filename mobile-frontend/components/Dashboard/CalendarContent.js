import React, { useState, useContext, useEffect } from 'react'
import { View, Dimensions } from 'react-native'
import { Calendar } from 'react-native-calendars'
import axios from 'axios'

import { AuthContext } from '../../store/auth-context'
import { buildPath } from '../../util/buildPath'

function CalendarContent() {
  const authCtx = useContext(AuthContext)
  console.log(authCtx.userid)
  console.log(authCtx.token)

  const { width, height } = Dimensions.get('window')
  const [selectedDate, setSelectedDate] = useState('')

  const handleDayPress = (date) => {
    setSelectedDate(date.dateString)
  }

  useEffect(() => {
    axios
      .get(buildPath(`api/v1/clockwork/getCalendar/${authCtx.userid}/2`), {
        headers: { token: authCtx.token },
      })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])
  return (
    <View>
      <Calendar
        style={{
          width: width * 0.9,
          height: height * 0.5,
          paddingVertical: 10,
        }}
        onDayPress={handleDayPress}
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: 'blue',
          },
        }}
      />
    </View>
  )
}

export default CalendarContent
