import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './TaskDetail.css'
import { updateTask } from '../data/updateTask'

function TaskDetail(props) {
  const location = useLocation()
  const navigate = useNavigate()
  console.log(location.state.taskInfo[0])
  const taskInfo = location.state.taskInfo[0]
  const [successfulAdd, setSuccessfulAdd] = useState(false)
  const [formData, setFormData] = useState({
    title: taskInfo.title,
    user: localStorage.getItem('userid'),
    task_id: taskInfo._id,
    datestart: taskInfo.datestart,
    dateend: taskInfo.dateend,
    description: taskInfo.description,
    interval: {
      unit: taskInfo.interval.unit,
      value: taskInfo.interval.value,
    },
    notes: taskInfo.notes,
    notifyintensity: taskInfo.notifyintensity,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    updateTask(formData)
      .then((response) => {
        if (response.status === 200) {
          alert('task updated!')
          console.log(response)
          //   navigate('/calendar')
        }
        console.log(response)
      })
      .catch((e) => console.log(e))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleIntervalChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      interval: {
        ...prevState.interval,
        [name]: value,
      },
    }))
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="full-width form-info">
          <h3>Task Details</h3>
        </div>
        <div className="form-info">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-info">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-info">
          <label>Date Start:</label>
          <input
            type="datetime-local"
            name="datestart"
            value={formData.datestart}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-info">
          <label>Interval:</label>
          <select
            name="unit"
            value={formData.interval.unit}
            onChange={handleIntervalChange}
          >
            <option value="none">None</option>
            <option value="days">Days</option>
            <option value="weeks">Weeks</option>
            <option value="months">Months</option>
          </select>
        </div>
        <div className="form-info">
          <label>Date End:</label>
          <input
            type="datetime-local"
            name="dateend"
            value={formData.dateend}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-info">
          <label>Interval Value:</label>
          <input
            type="text"
            name="value"
            value={formData.interval.value}
            onChange={handleIntervalChange}
          />
        </div>
        <div className="form-info">
          <label>Notes:</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-info">
          <label>Notify Intensity:</label>
          <select
            name="notifyintensity"
            value={formData.notifyintensity}
            onChange={handleChange}
          >
            <option value="none">None</option>
            <option value="mild">Mild</option>
            <option value="moderate">Moderate</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
        <div className="form-info full-width">
          <button type="submit">submit edit</button>
        </div>
      </form>
    </div>
  )
}

export default TaskDetail
