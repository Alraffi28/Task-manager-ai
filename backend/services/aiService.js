const axios = require("axios");

exports.classifyTask = async (description) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:6000/predict",
      { description }
    );

    return response.data;
  } catch (error) {
    throw new Error("AI Service Error");
  }
};
