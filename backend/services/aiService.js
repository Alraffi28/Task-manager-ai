const axios = require("axios");

exports.classifyTask = async (description) => {
  try {
    const response = await axios.post(
      "https://task-manager-ai-1.onrender.com/predict",
      { description },
      {timeout : 2000}
    );
    return response.data;
  } catch (error) {
    console.error("AI SERVICE ERROR : ",error.response?.data || error.message)
    throw new Error("AI Service Error");
  }
};
