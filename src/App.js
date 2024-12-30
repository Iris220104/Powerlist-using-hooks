import React, {useState} from 'react'
import { useEffect } from 'react'
import {GiHornedHelm}from 'react-icons/gi'
import {AiOutlinePlus,AiOutlineClose} from 'react-icons/ai'

function App(){
  const [tasks, setTasks]=useState([])
  const [input, setInput]=useState(' ')

 // Load tasks from local storage when the component mounts
useEffect(() => {
  const savedTasks = JSON.parse(localStorage.getItem('tasks'));
  if (savedTasks) {
    setTasks(savedTasks);
  }
  console.log('Loaded tasks from local storage:', savedTasks);
}, []);

  // Save tasks to local storage whenever the tasks array changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

//add task
  const handleSubmit =(event) => {
    event.preventDefault()
    const addTask = {
      id : Math.floor(Math.random() * 1000),
      text: input,
      completed: false }
    setTasks([...tasks, addTask])
    setInput(' ')
  }
//delete task
  const deleteTask = (id) =>{
let filteredTasks = [...tasks].filter((tasks) => tasks.id !== id)
setTasks(filteredTasks)
}

//toggle completed task
const toggleComplete = (id) =>{
  setTasks(
    tasks.map(task =>(
      task.id === id ?{...task, completed: !task.completed} :task
    ))
  )
}
const date = new Date()
//console.log(date)
const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

  return (
    <div className='app'>
      <div className="container">
        <h1><GiHornedHelm />
          Powerlist
        </h1>
        <div className="Date">
          <p>{days[date.getDay()]},{date.getDate()},{months[date.getMonth()]}</p>
        

        </div>
        <form onSubmit={handleSubmit}>
          <div className="from-input">
          <AiOutlinePlus className='icon' />
          <input value={input}
          onChange={event => setInput(event.target.value)} placeholder='Enter a task' type ="text"/>
          </div>
        </form>

        <div>
          {tasks.map(task =>(
           <div className={`task-row ${task.completed ? 'completed':''}`} key={task.id} onDoubleClick={() => toggleComplete(task.id)} >
            <p> {task.text}  </p>
            <AiOutlineClose onClick = {() => deleteTask(task.id)} className='icon'/>
           </div> )
          )}
        </div>
        <p className = 'length'> {(tasks < 1)? 'You have no tasks': `Tasks: ${tasks.length}`}</p>
        


      </div>
    </div>
    );
  }

export default App;
