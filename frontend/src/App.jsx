import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateTask from "./pages/CreateTask";
import EditTask from "./pages/EditTask";
import { ToastContainer } from "react-toastify";
import "./App.css"

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreateTask />} />
        <Route path="/edit/:id" element={<EditTask />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer
    position="bottom-right"
    autoClose={2000}
    hideProgressBar={false}
    newestOnTop
    closeButton
    pauseOnHover
    theme="colored"
    />
    </>
  );
}

export default App