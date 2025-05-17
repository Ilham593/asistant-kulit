import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authrouter from "./routes/auth.js";
import predictrouter from "./routes/predict.js";
import riwayatrouter from "./routes/riwayat.js";
import artikelrouter from "./routes/artikel.js";
dotenv.config();
const app = express();


// middleware
app.use(express.json());
app.use(cors());


// connet
connectDB();
app.use("/api/auth", authrouter);
app.use("/api", predictrouter);
app.use("/api", riwayatrouter);
app.use("/api", artikelrouter);

const PORRT = process.env.PORT || 5000;

app.listen(PORRT, () => {
  console.log(`Server running on port ${PORRT}`);
});
