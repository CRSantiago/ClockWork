import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

import { getTask } from "../data/getTask"
import { deleteTask } from "../data/deleteTask"
import DeleteConfirmationDialog from "./Dialogs/DeleteDialog"
import "./Task.css"

function Task({ task }) {
  const navigate = useNavigate()

  const [showConfirmation, setShowConfirmation] = useState(false)

  function handleDetails() {
    console.log("details button clicked!")
    getTask(task.taskid).then((response) => {
      console.log(response.data)
      navigate("/TaskDetail", { state: { taskInfo: response.data } })
    })
  }

  function handleDeleteClick() {
    setShowConfirmation(true)
  }

  function handleCancelClick() {
    setShowConfirmation(false)
  }

  function handleConfirmDelete() {
    console.log("delete button clicked!")
    deleteTask({
      id: localStorage.getItem("userid"),
      taskId: task.taskid,
    })
      .then((response) => {
        if (response.status === 200) {
          alert("task deleted!")
          setShowConfirmation(false)
          navigate("/calendar")
        }
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
        alert("task could not be deleted!")
        setShowConfirmation(false)
      })

    //}
  }
  return (
    <div className="taskContainer">
      <div className="taskDiv">
        <h3>{task.title}</h3>
        <div className="buttonDiv">
          {!showConfirmation && (
            <div className="actionsDiv">
              <button className="detailsButton" onClick={handleDetails}>
                Details
              </button>
              <button className="deleteButton" onClick={handleDeleteClick}>
                Delete
              </button>
            </div>
          )}
          {showConfirmation && (
            <div className="overlay">
              <DeleteConfirmationDialog
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelClick}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Task
