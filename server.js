const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();

// === CORS Configuration (Important for GitHub Pages) ===
app.use(cors({
    origin: ['https://marveycrypton.github.io', 'http://localhost:5500', 'http://127.0.0.1:5500'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb+srv://arayinka15_db_user:NjlanibNv02ReTZc@cluster0.v1spvol.mongodb.net/?retryWrites=true&w=majority")
    .then(() => console.log("✅ MongoDB connected"))
    .catch(err => console.log("❌ DB Error:", err));

// User Schema & Model
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const User = mongoose.model("User", UserSchema);

// ====================== ROUTES ======================

// Signup Route
app.post("/signup", async (req, res) => {
    console.log("🔥 Signup request received:", req.body);

    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        console.log("✅ User created:", email);
        res.json({ message: "User created successfully" });

    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// Login Route
app.post("/login", async (req, res) => {
    console.log("🔥 Login request received:", req.body);

    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Wrong password" });

        res.json({ message: "Login successful" });

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});