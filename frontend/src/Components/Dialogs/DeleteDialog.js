import React, { useState } from "react"

function DeleteConfirmationDialog({ onConfirm, onCancel }) {
  return (
    <div className="dialog">
      <div className="header">Confirm Delete</div>
      <div className="body">Are you sure you want to delete this item?</div>
      <div className="footer">
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onCancel}>No</button>
      </div>
    </div>
  )
}

export default DeleteConfirmationDialog
