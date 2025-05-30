const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

//  Explicitly allow your Webflow domain
app.use(cors({
  origin: "https://hosteasy-86eed5.webflow.io/listing-audit", // replace with your actual Webflow domain
  methods: ["POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

app.post("/proxy", async (req, res) => {
  try {
    const response = await axios.post(
      "https://ai-listing-audit.alfred.hosteasy.ai/api/v0/ai_audit",
      req.body,
      {
        headers: { "Content-Type": "application/json" }
      }
    );
    res.json({ success: true, data: response.data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
