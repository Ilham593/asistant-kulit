import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authrouter from "./routes/auth.js";
import predictrouter from "./routes/predict.js";
import riwayatrouter from "./routes/riwayat.js";
import swaagerDocs from "./swagger.js";
import swagger from "./swagger.js";
// import artikelrouter from "./routes/artikel.js";
// import statistikrouter from "./routes/statistik.js";
dotenv.config();
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// connet
connectDB();
app.use("/api/auth", authrouter);
app.use("/api", predictrouter);
app.use("/api", riwayatrouter);
// app.use("/api", artikelrouter);
// app.use("/api", statistikrouter);

const PORRT = process.env.PORT || 5000;
swaagerDocs(app);

app.listen(PORRT, () => {
  console.log(`Server running on port ${PORRT}`);
  console.log("swagger docs running on http://localhost:5000/api-docs");
});
