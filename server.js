import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Example test route
app.get("/", (req, res) => {
  res.json({ message: "Backend connected successfully on Render!" });
});

// Contact route (you can add nodemailer here)
app.post("/contact", (req, res) => {
  res.json({ message: "Contact form received successfully!" });
});

// Render will assign a dynamic port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
