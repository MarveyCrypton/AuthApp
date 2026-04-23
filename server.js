const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();

// CORS
app.use(cors({
    origin: "https://marveycrypton.github.io",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// MongoDB Connection (updated with retryWrites)
mongoose.connect("mongodb+srv://arayinka15_db_user:NjlanibNv02ReTZc@cluster0.v1spvol.mongodb.net/AuthApp?retryWrites=true&w=majority&serverSelectionTimeoutMS=30000")
    .then(() => console.log("✅ MongoDB Connected Successfully"))
    .catch(err => {
        console.error("❌ MongoDB Connection Error:", err);
    });

// User Model
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const User = mongoose.model("User", UserSchema);

// Signup Route
app.post("/signup", async (req, res) => {
    console.log("🔥 Signup request body:", req.body);

    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        console.log("✅ New user created:", email);
        res.json({ message: "Account created successfully!" });

    } catch (error) {
        console.error("❌ Signup Error Details:", error.message);
        res.status(500).json({ message: "Server error. Please try again." });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

// Temporary Clear All Users Route (using GET so you can access it easily)
app.get("/clear-users", async (req, res) => {
    try {
        const result = await User.deleteMany({});
        console.log(`✅ Cleared ${result.deletedCount} users from database`);
        
        res.json({ 
            success: true,
            message: `Successfully deleted ${result.deletedCount} users. Database is now empty! You can start fresh.` 
        });
    } catch (error) {
        console.error("Clear users error:", error);
        res.status(500).json({ message: "Failed to clear users" });
    }
});