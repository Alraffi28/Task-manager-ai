import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../services/api'
import { FiSave, FiX, FiCpu } from "react-icons/fi"
import "./taskForm.css"

export default function CreateTask() {

    const navigate = useNavigate()

    const [task , setTask] = useState({
        title : "",
        description : "",
        priority : "",
        status : ""
    })

    const [error , setError] = useState("")

    const handleChange = (e) => {
        setTask({...task,[e.target.name] : e.target.value})
        setError("")
    }

    const autoCategorize = async () =>{
        if (!task.description.trim()) {
            setError("Please enter description for AI categorization")
            return;
        }

        try {  
            const res = await API.post("/classify", {
                description: task.description
            })

            setTask({...task , 
                priority : res.data.priority , 
                status : res.data.status
            })

        } catch {
            setError("AI categorization failed")
        }
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        if(!task.title.trim()){
            setError("Title is required")
            return;
        }

        if(!task.description.trim()){
            setError("Description is required")
            return;
        }

        try {
            await API.post("/" , task)
            navigate('/dashboard')  
        } catch {
            setError("Failed to create task")
        }
    }

    useEffect(()=>{
        const email = localStorage.getItem("email")
        if(!email){
            navigate('/')
        }
    },[])

  return (
    <div className="form-container">

        <div className="form-card">

            <h2>Create Task</h2>

            <div className="form-group">
                <label>Title</label>
                <input
                    type="text"
                    name="title"
                    value={task.title}
                    onChange={handleChange}
                    placeholder="Enter task title"
                />
            </div>

            <div className="form-group">
                <label>Description</label>
                <textarea
                    name="description"
                    value={task.description}
                    onChange={handleChange}
                    placeholder="Enter task description"
                />
            </div>

            <button className="btn-outline ai-btn" onClick={autoCategorize}>
                <FiCpu />
                Auto Categorize
            </button>

            <div className="form-row">
                <div className="form-group">
                    <label>Priority</label>
                    <input
                        type="text"
                        name="priority"
                        value={task.priority}
                        onChange={handleChange}
                        placeholder="Priority"
                    />
                </div>

                <div className="form-group">
                    <label>Status</label>
                    <input
                        type="text"
                        name="status"
                        value={task.status}
                        onChange={handleChange}
                        placeholder="Status"
                    />
                </div>
            </div>

            {error && <p className="error-text">{error}</p>}

            <div className="form-actions">

                <button className="btn-primary" onClick={handleSubmit}>
                    <FiSave />
                    Save Task
                </button>

                <button 
                    className="btn-danger-outline"
                    onClick={()=>navigate('/dashboard')}
                >
                    <FiX />
                    Cancel
                </button>

            </div>

        </div>

    </div>
  )
}
