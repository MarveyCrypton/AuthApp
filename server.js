const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://arayinka15_db_user:NjlanibNv02ReTZc@cluster0.v1spvol.mongodb.net/?appName=Cluster0")
.then(() => console.log("DB connected"))
.catch(err => console.log(err));

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const User = mongoose.model("User", UserSchema);

app.post("/signup", async (req, res) => {
  console.log("🔥 Signup request received");
  console.log(req.body);

  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword
  });

  await user.save();

  console.log("✅ User saved:", email);

  res.json({ message: "User created" });
});

app.post("/login", async (req, res) => {
  console.log("🔥 Login request received");
  console.log(req.body);

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return res.json({ message: "Wrong password" });

  res.json({ message: "Login successful" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

app.post("/signup", (req, res) => {
  console.log("🔥 signup hit");
  res.json({ message: "ok" });

  const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

});