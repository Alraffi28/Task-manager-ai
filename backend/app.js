const express = require("express");
const cors = require("cors");
require('dotenv').config()
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(cors({origin : process.env.CLIENT_URL}));
app.use(express.json());

app.use("/api/tasks", taskRoutes);

app.use((err , res , req , next)=>{
    console.log(err.stack);
    res.status(500).json({message : "Internal server error"})
});

module.exports = app;