// const axios = require("axios");
// const AI_URL= "https://task-manager-ai-1.onrender.com/predict";

// const delay = (ms)=> new Promise(resolve => setTimeout(resolve , ms))

// exports.classifyTask = async (description) => {
//   const maxAttempts = 4
//   for(let attempt = 1 ; attempt<= maxAttempts ; attempt++){
//     try {
//       const response = await axios.post(
//         AI_URL,
//         {description},
//         {timeout : 3000}
//       )
//       return response.data
//     } catch (error) {
//       console.log(`AI attempt ${attempt} failed`)
//       if(attempt === maxAttempts){
//         throw new Error("AI Service Error")
//       }
//       await delay(attempt*4000)
//     }
//   }
// };
exports.classifyTask = async (description) => {

  const text = description.toLowerCase();

  let priority = "medium";

  if (text.includes("urgent") || text.includes("immediately")) {
    priority = "high";
  } else if (text.includes("later") || text.includes("low")) {
    priority = "low";
  }

  let status = "todo";

  if (text.includes("completed") || text.includes("done")) {
    status = "done";
  }

  return { priority, status };
};
