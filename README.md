## AI Task Manager

An AI-powered full-stack task management application built using microservice architecture.  
Users can create, manage, and automatically categorize tasks using an integrated AI service.

## Live Demo
https://your-vercel-link-here

## Features
Email-based Login  
Create, Edit & Delete Tasks  
AI Auto Task Categorization  
Analytics Dashboard  
Protected Routes & Logout  
CI/CD Pipeline with GitHub Actions  

## AI Integration
Tasks can be auto-classified using a Flask-based AI microservice that predicts:

- Priority → High / Medium / Low  
- Status → Done / Todo  

## Dashboard Analytics
Displays:

- Total Tasks
- Completed vs Pending Tasks
- Priority Distribution
- Status Distribution

## Tech Stack

### Frontend
- React (Vite)
- Axios
- CSS3

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

### AI Service
- Python
- Flask

### DevOps
- GitHub Actions CI Pipeline
- Vercel Deployment

## Project Structure
```
backend      → Express API
frontend     → React UI
ai-service   → Flask AI microservice
.github      → CI/CD workflow
```

## Local Setup

### Clone Repo
```
git clone <repo-link>
cd Assignment
```
---

### Backend
```
cd backend
npm install
npm run dev
```
Create `.env`
```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<db_password>@cluster0.xvjtlej.mongodb.net/?appName=Cluster0
```
---

### AI Service
```
cd ai-service
pip install flask
python app.py
```

### Frontend
```
cd frontend
npm install
npm run dev
```

## CI/CD
GitHub Actions automatically installs dependencies and builds the frontend on every push.

## Author
Mohammed Alraffi J
