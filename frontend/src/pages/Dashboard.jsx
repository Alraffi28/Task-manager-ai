import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FiPlus, FiLogOut, FiEdit, FiTrash2 } from "react-icons/fi"
import API from "../services/api"
import "../style/dashboard.css"

export default function Dashboard(){
    const [tasks , setTasks]  = useState([])
    const [error , setError] = useState("")
    const navigate = useNavigate()

    const fetchTasks = async ()=>{
        try{
            const res = await API.get('/')
            setTasks(res.data || [])
        }catch(err){
            setError("Failed to load tasks")
        }
    }

    const handleLogout = () =>{
        const logout = window.confirm("Click OK to Logout")
        if(!logout) return;
        localStorage.removeItem("email")
        navigate('/')
    }

    useEffect(()=>{
        const email = localStorage.getItem("email")
        if(!email){
            navigate('/')
            return;
        }
        fetchTasks()
    },[])

    const deleteTasks = async (id) =>{
        const confirmDel = window.confirm("Are you sure you want to delete this task?")
        if(!confirmDel) return;
        try{
            await API.delete(`/${id}`)
            fetchTasks()
        }catch{
            alert("deletion failed")
        }
    }

    const totalTasks = tasks.length
    const completedTasks = tasks.filter(t => t.status === "done").length
    const pendingTasks = totalTasks - completedTasks

    const priorityStats = {
        high: tasks.filter(t => t.priority === "high").length,
        medium: tasks.filter(t => t.priority === "medium").length,
        low: tasks.filter(t => t.priority === "low").length
    }

    const statusStats = {
        done: tasks.filter(t => t.status === "done").length,
        todo: tasks.filter(t => t.status === "todo").length
    }
    return(
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h2>Dashboard</h2>
                <div className="dashboard-actions">
                    <button className="btn-primary" onClick={()=>navigate("/create")}><FiPlus />Create Task</button>
                    <button className="btn-danger" onClick={handleLogout}><FiLogOut />Logout</button>
                </div>
            </div>

            {error && <p className="error-text">{error}</p>}
        <div className="analytics-grid">
            <div className="analytics-card">
                <h4>Total Tasks</h4>
                <p>{totalTasks}</p>
            </div>
            <div className="analytics-card">
                <h4>Completed</h4>
                <p>{completedTasks}</p>
            </div>
            <div className="analytics-card">
                <h4>Pending</h4>
                <p>{pendingTasks}</p>
            </div>
            <div className="analytics-card">
                <h4>Priority</h4>
                <p>High : {priorityStats.high}</p>
                <p>Medium : {priorityStats.medium}</p>
                <p>Low : {priorityStats.low}</p>
            </div>
            <div className="analytics-card">
                <h4>Status</h4>
                <p>Done : {statusStats.done}</p>
                <p>Todo : {statusStats.todo}</p>
            </div>
        </div>
            <h2>Tasks</h2>
            <br />
        {tasks.length === 0 && <p>No tasks found</p>}
        <div className="task-grid">
            {
                tasks.map((task)=>(
                    <div className="task-card" key={task._id}>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <div className="task-card-actions">
                            <button className="btn-outline" onClick={()=> navigate(`/edit/${task._id}`)}><FiEdit /> Edit</button>
                            <button className="btn-danger-outline" onClick={()=>deleteTasks(task._id)}><FiTrash2/> Delete</button>
                        </div>
                    </div>
                ))
            }
            </div>
        </div>
    )
}