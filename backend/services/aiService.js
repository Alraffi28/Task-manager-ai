const axios = require("axios");
const AI_BASE = "https://task-manager-ai-1.onrender.com";

exports.classifyTask = async (description) => {
  try {
    await axios.get(AI_BASE);
    const response = await axios.post(
      `${AI_BASE}/predict`,
      { description },
      { timeout: 20000 }
    );

    return response.data;

  } catch (error) {
    console.error("AI Service Error:", error.message);
    throw new Error("AI Service Error");
  }
};
