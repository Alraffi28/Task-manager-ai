const axios = require("axios");

exports.classifyTask = async (description) => {
  try {
    const response = await axios.post(
      "https://task-manager-ai-1.onrender.com",
      { description }
    );

    return response.data;
  } catch (error) {
    throw new Error("AI Service Error");
  }
};
