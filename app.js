require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./src/models/index");
const User = require("./src/models/user");
const Task = require("./src/models/task");
const authRoutes = require("./src/routes/authRoutes");
const taskRoutes = require("./src/routes/taskRoutes");

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://user-management-frontend-a7l6.vercel.app", // ✅ your Vercel frontend
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 4000;

(async () => {
  await sequelize.sync({ alter: true }); // dev: keep sync simple
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
})();
