import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

import { getTask } from "../data/getTask"
import { deleteTask } from "../data/deleteTask"
import "./Task.css"

function Task({ task }) {
  const navigate = useNavigate()
  function handleDetails() {
    console.log("details button clicked!")
    getTask(task.taskid).then((response) => {
      console.log(response.data)
      navigate("/TaskDetail", { state: { taskInfo: response.data } })
    })
  }
  function handleDelete() {
    console.log("delete button clicked!")
    const shouldDelete = window.confirm(
      `Are you sure you want to delete the task: ${task.title}?`
    )
    if (shouldDelete) {
      deleteTask({
        id: localStorage.getItem("userid"),
        taskId: task.taskid,
      }).then((response) => console.log(response))
    }
  }
  return (
    <div className="taskContainer">
      <div className="taskDiv">
        <h3>{task.title}</h3>
        <div className="buttonDiv">
          <button className="detailsButton" onClick={handleDetails}>
            Details
          </button>
          <button className="deleteButton" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default Task
