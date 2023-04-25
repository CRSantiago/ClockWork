import {
  View,
  Dimensions,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

function Task({ task }) {
  function handleDetailsPress() {
    // Handle press for View Details button
  }

  function handleDeletePress() {
    // Handle press for Delete Task button
  }

  return (
    <View style={styles.taskContainer}>
      <View style={styles.textContainer}>
        <Text>{task.title}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonDetails}
          onPress={handleDetailsPress}
        >
          <Text style={styles.buttonText}>View Details</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonDelete}
          onPress={handleDeletePress}
        >
          <Text style={styles.buttonText}>Delete Task</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 10,
    padding: 5,
  },
  textContainer: {
    paddingBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  buttonDetails: {
    backgroundColor: 'blue',
    padding: 5,
    borderRadius: 5,
  },
  buttonDelete: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
    marginLeft: 5,
  },
  buttonText: {
    color: 'white',
  },
})

export default Task
