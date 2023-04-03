import React, { useState } from 'react'
import { View, Dimensions} from 'react-native'
import { Calendar } from 'react-native-calendars'

function CalendarContent() {

  const {width, height} = Dimensions.get('window')
  const [selectedDate, setSelectedDate] = useState('')

  const handleDayPress = (date) => {
    setSelectedDate(date.dateString)
  }

  return (
    <View>
      <Calendar
      style={{
        width:width*0.9,
        height:height*0.5,
        paddingVertical:10
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
