import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.use("/api", authRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
