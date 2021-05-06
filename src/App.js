
import {  useState,useEffect } from 'react'
//import {browserRouter as Router, Route} from 'react-router-dom'
import { BrowserRouter as Router,  Route, } from "react-router-dom";
import Header from './components/Header';
import Tasks from './components/Tasks';
import Footer from './components/Footer';
import AddTask from './components/AddTask';
import About from './components/About';
function App() {
const [showAddTask, setShowAddTask] = useState(false)

  const [tasks,setTasks] = useState([
    {id: 1,
        text: 'Doctors Appointment',
        day: 'Feb 5th at 2:30pm',
        reminder:true,
    
    },
    {id:2,
        text: 'Teacherss Appointment',
        day: 'Feb 7th at 4:30pm',
        reminder:true,
    
    },
    {
        id: 3,
        text: 'Study Group',
        day: 'Feb 15th at 2:30pm',
        reminder:false,
    }
    
    
    
    
    ]);

    useEffect(() => {

     
const getTasks = async () => {
  const tasksFromServer = await fetchTasks()
  setTasks(tasksFromServer)
}
      getTasks()
    },[])
//fetch tasks
const fetchTasks = async() => {
  const res = await fetch('http://localhost:5000/tasks')

  const data =await res.json()
 return data
  
}
//fetch task
const fetchTask = async(id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`)

  const data =await res.json()
 return data
  
}

    //Add task
    const addTask = async(task) => {
// const id = Math.floor(Math.random()*10000)+1
// const newTask = { id, ...task}
// setTasks([...tasks, newTask])
const res =await fetch('http://localhost:5000/tasks',{
  method: 'POST',
  headers: {
    'content-type': 'application/json'

  },
  body: JSON.stringify(task)
})
const data = await res.json()
setTasks([...tasks,data])
    }

    //Delete a Task
    const deleteTask = async(id) =>{
await fetch(`http://localhost:5000/tasks/${id}`,{method:'DELETE'})

setTasks(tasks.filter((task) => task.id !== id))
    }

    //toggle reminder
    const toggleReminder = async(id) => {
const taskToggle = await fetchTask(id)
const updtask ={...taskToggle, reminder: !taskToggle.reminder}

const res =await fetch (`http://localhost:5000/tasks/${id}`,{method : 'PUT',
headers: {
  'content-type':'application/json'
}, body: JSON.stringify(updtask)})


const data =await res.json()
    setTasks(tasks.map((task) => task.id === id? {...task, reminder: !data.reminder} : task))
    }
  return (
    <Router>
    <div className ='container'>
<Header onAdd ={ () =>setShowAddTask(!showAddTask) }  showAdd = {showAddTask}/>

  <Route path='/' exact render={(props)=> (

    <>
{showAddTask && <AddTask onAdd={addTask} />}
{tasks.length > 0 ?<Tasks tasks={tasks} onDelete={deleteTask}  onToggle = {toggleReminder}/>: 'NO TASKS TO SHOW'}
  
    </>
  )}/>
  <Route path ='/about' component ={About}/>
    <Footer />
    
    </div>
    </Router>
  );
}

export default App;
