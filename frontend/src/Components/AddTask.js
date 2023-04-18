import React, { useState } from 'react'
import { createTask } from '../data/createTask'
import Navbar from './Navigation/Navbar'
import './AddTask.css'

function AddTask() {
  const [successfulAdd, setSuccessfulAdd] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    user: localStorage.getItem('userid'),
    datestart: '',
    dateend: '',
    description: '',
    interval: {
      unit: 'none',
      value: 0,
    },
    notes: '',
    notifyintensity: 'none',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    createTask(formData)
      .then((response) => {
        if (response.status === 200) {
          setSuccessfulAdd(true)
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
    setSuccessfulAdd(false)
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
    setSuccessfulAdd(false)
  }

  return (
    <div className="addTask-container">
      <div className="navBarDiv-addtask">
        <Navbar />
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="full-width form-info">
            <h2>Add Task Form</h2>
          </div>
          <div className="form-info">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              placeholder="what would you call this task"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-info">
            <label>Description:</label>
            <textarea
              name="description"
              placeholder="How would you describe this task"
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
              type="number"
              name="value"
              value={formData.interval.value}
              onChange={handleIntervalChange}
            />
          </div>
          <div className="form-info">
            <label>Notes:</label>
            <textarea
              name="notes"
              placeholder="any notes for this task"
              value={formData.notes}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-info">
            <label>Notify Intensity</label>
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
            <button type="submit" className="addTaskButton">
              Add Task
            </button>
          </div>
        </form>
        {successfulAdd && (
          <div className="form-info full-width">
            <span>Task was successfully added!</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default AddTask
