import { useNavigate } from "react-router-dom"

import AddTaskImg from '../../images/addtask1.png'
import './navElements.css'

function AddTaskButton(){
    const navigate = useNavigate()
    function handleAddTaskNavigate() {
        navigate('/AddTask')
      }
    return (
        <button className='navButton' onClick={handleAddTaskNavigate}>
            <img className='navImage' src={AddTaskImg} alt='Add Task Button button'/>
            <span className="tooltiptext">Add Task</span>
        </button>
    )
}

export default AddTaskButton