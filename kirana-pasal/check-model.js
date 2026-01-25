
const apiKey = process.env.GOOGLE_API_KEY || "AIzaSyDpLNEsUNwnT7RgSuYXy2AWaq5omzyVwXg";

fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`)
  .then(res => res.json())
  .then(data => {
    console.log("✅ Available models:\n");
    data.models.forEach(model => {
      if (model.supportedGenerationMethods.includes("generateContent")) {
        console.log(`- ${model.name}`);
      }
    });
  })
  .catch(err => console.error("❌ Error:", err));
