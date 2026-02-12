const axios = require("axios")
const AI_URL = "https://task-manager-ai-1.onrender.com/predict";

// Flask
exports.classifyTask = async(description) =>{
  try {
    const response = await axios.post(
      AI_URL,{description},{timeout : 5000}
    )
    console.log("Flask used");
    return response.data
  } catch (error) {
    console.log("Flask unavailable");
    return localClassifer(description)
  }
}

const localClassifer = (description) =>{
  const text = description.toLowerCase()

  let priority = "medium"
  if(text.includes("urgent") || text.includes("immediately") || text.includes("immediate")){
    priority = "high"
  }else if(text.includes("later") || text.includes("low") || text.includes("not")){
    priority = "low"
  }

  let status = "todo"
  if(text.includes("completed") || text.includes("done") || text.includes("over")){
    status = "done"
  }
  return {priority , status}
}

