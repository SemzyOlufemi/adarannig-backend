import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Backend connected successfully on Render!" });
});

// 📧 Contact form route
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "All fields required" });
  }

  // Configure your email transporter
 const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER, // from Render Environment
    pass: process.env.EMAIL_PASS, // from Render Environment
  },
});


  const mailOptions = {
    from: email,
    to: "adarannigltd@gmail.com",
    subject: `New Contact Message from ${name}`,
    text: `
      Name: ${name}
      Email: ${email}
      Message: ${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({ success: false, message: "Error sending message" });
  }
});

// Render port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
