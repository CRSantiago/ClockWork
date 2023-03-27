import React, { useState } from 'react'
import { View } from 'react-native'
import { Calendar } from 'react-native-calendars'

function CalendarContent() {
  const [selectedDate, setSelectedDate] = useState('')

  const handleDayPress = (date) => {
    setSelectedDate(date.dateString)
  }

  return (
    <View>
      <Calendar
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
