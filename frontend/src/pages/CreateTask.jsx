import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../services/api'
import { FiSave, FiX, FiCpu } from "react-icons/fi"
import { toast } from 'react-toastify'
import '../style/taskForm.css'

export default function CreateTask() {
    const navigate = useNavigate()
    const [task , setTask] = useState({
        title : "",
        description : "",
        priority : "",
        status : ""
    })
    const [error , setError] = useState("")
    const [aiLoading , setAiLoading] = useState(false)

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
            setAiLoading(true)
            const res = await API.post("/classify", {
                description: task.description
            })
            setTask({...task , priority : res.data.priority , status : res.data.status})
        } catch (error) {
            setError("AI categorization failed")
        }finally{
            setAiLoading(false)
        }
    }

    const handleSubmit = async(e) =>{
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
            toast.success("Task created successfully")
        } catch (error) {
            toast.error("Failed to create task")
        }
    }

    useEffect(()=>{
        const email = localStorage.getItem("email")
        if(!email){
            navigate('/')
        }
    },[])
  return (
    <div className='form-container'>
        <form className='form-card' onSubmit={handleSubmit}>
            <h2>Create Task</h2>
            <div className="form-group">
                <label htmlFor="">Title</label>
                <input type="text" name='title' placeholder='Enter Title'
                value={task.title}onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="">Description</label>
                <textarea name="description" onChange={handleChange}
                value={task.description} placeholder='Enter Description'></textarea>
            </div>
                <button type='button' className="btn-outline ai-btn" onClick={autoCategorize}>
                    {aiLoading ? "Classifying..." : <><FiCpu /> Auto Categorize</>}
                    </button>
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="">Priority</label>
                    <input type="text" name='priority'
                    value={task.priority} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="">Status</label>
                    <input type="text" name="status"
                    value={task.status} onChange={handleChange}/>
                </div>
            </div>

                {error && <p className='error-text'>{error}</p>}
            <div className="form-actions">
                <button type='submit' className='btn-primary'><FiSave />Save Task</button>
                <button type='button' className="btn-danger-outline" onClick={()=>navigate('/dashboard')}><FiX/>Cancel</button>
            </div>
        </form>
      
    </div>
  )
}
