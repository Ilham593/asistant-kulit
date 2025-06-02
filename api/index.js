import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "../config/db.js";
import swaggerDocs from "../swagger.js";

// routes
import authrouter from "../routes/auth.js";
import predictrouter from "../routes/predict.js";
import riwayatrouter from "../routes/riwayat.js";
// import artikelrouter from "../routes/artikel.js";
// import statistikrouter from "../routes/statistik.js";

dotenv.config();

const app = express();

// mencegah connect DB berkali-kali di serverless
let connected = false;
async function initDB() {
  if (!connected) {
    await connectDB();
    connected = true;
  }
}

// middleware
app.use(cors());

import cors from 'cors';

app.use(cors({ origin: "*" }));

app.use(cors({ origin: "https://asistant-kulit-mfiguv78g-hams-projects-53365496.vercel.app" }));

app.use(express.json());

// routes utama
app.use("/api/auth", authrouter);
app.use("/api", predictrouter);
app.use("/api", riwayatrouter);
// app.use("/api", artikelrouter);
// app.use("/api", statistikrouter);

// Swagger docs
swaggerDocs(app);

// redirect root
app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

// ✅ ini format serverless (tidak pakai app.listen)
export default async function handler(req, res) {
  await initDB();
  return app(req, res);
}
