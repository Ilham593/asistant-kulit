import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import router from "./routes/auth.js";
dotenv.config();
const app = express();


// middleware
app.use(express.json());
app.use(cors());


// connet
connectDB();
app.use("/api/auth", router);

const PORRT = process.env.PORT || 5000;

app.listen(PORRT, () => {
  console.log(`Server running on port ${PORRT}`);
});
