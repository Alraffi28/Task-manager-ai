import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../services/api'
import { FiEdit3, FiX, FiCpu } from "react-icons/fi"
import Spinner from "../components/Spinner"
import "../style/taskForm.css"
import { toast } from 'react-toastify'

export default function EditTask() {
    const {id} = useParams()
    const navigate = useNavigate()
    const [task , setTask] = useState({
        title : "",
        description : "",
        priority : "",
        status : ""
    })
    const [error , setError] = useState("")
    const [loading , setLoading] = useState(true)
    const [aiLoading , setAiLoading] = useState(false)

    const fetchTask = async () =>{
        try {
            const res = await API.get(`/${id}`)
            setTask(res.data)
        } catch (error) {
            setError("Failed to load task")
            console.log(error);
        }finally{
            setLoading(false)
        }
    }

    const handleChange = (e) =>{
        setTask({...task,[e.target.name] : e.target.value})
        setError("")
    }

    const autoCategorize = async () =>{
        if(!task.description.trim()){
            setError("Description required for AI categorization")
            return;
        }
        try {
            setAiLoading(true)
            const res = await API.post("/classify" , {
                description : task.description
            })
            setTask({...task ,
                priority : res.data.priority,
                status : res.data.status
            })
        } catch (error) {
            setError("AI categorization failed")
        }finally{
            setAiLoading(false)
        }
    }

    const handleUpdate = async (e)=>{
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
            await API.put(`/${id}` , task)
            toast.success("Task updated successfully")
            navigate("/dashboard")
        } catch (error) {
            toast.error("Failed to update task")
        }
    }
    
    useEffect(()=>{
        const email = localStorage.getItem("email")
        if(!email){
            navigate('/')
        }
        fetchTask()
    },[])
    if(loading) return <Spinner/>
  return (
    <div className='form-container'>
        <form className='form-card' onSubmit={handleUpdate}>
            <h2>Edit Task</h2>
            <div className="form-group">
                <label htmlFor="">Title</label>
                <input
                    name="title"
                    value={task.title}
                    onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="">Description</label>
                <textarea
                    name="description"
                    value={task.description}
                    onChange={handleChange}/>
            </div>   
                <button type='button' className="btn-outline ai-btn" onClick={autoCategorize}>
                    {aiLoading ? "Classifying..." : <><FiCpu /> Auto Categorize</>}
                </button>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="">Priority</label>
                    <input
                        name="priority"
                        value={task.priority}
                        onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="">Status</label>
                    <input
                        name="status"
                        value={task.status}
                        onChange={handleChange}/>
                </div>
            </div>


                {error && <p className='error-text'>{error}</p>}
            <div className="form-actions">
                <button type='submit' className='btn-primary'>
                    <FiEdit3 /> Update Task
                </button>
                <button type='button' className="btn-danger-outline" onClick={() => navigate("/dashboard")}>
                    <FiX /> Cancel
                </button>
            </div>
        </form>
    </div>
  )
}
