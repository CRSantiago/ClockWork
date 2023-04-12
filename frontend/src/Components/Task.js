import React, {useState} from "react";
function Task({task}) {
    //console.log(task)
    return(
        <div>
            <h2>{task.title}</h2>
        </div>
    )
}

export default Task