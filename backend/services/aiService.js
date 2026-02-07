const axios = require("axios");
const AI_URL = "https://task-manager-ai-1.onrender.com/predict"

exports.classifyTask = async (description) => {
  
    const attemptRequest = async()=>{
      return await axios.post(AI_URL, {description},{timeout:2000})
    }
  try {
    return (await attemptRequest()).data
  } catch (error) {
    console.log("AI asleep");
    await new Promise(resolve => setTimeout(resolve, 5000))
    return (await attemptRequest()).data
  }
};
