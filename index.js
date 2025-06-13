import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import swaggerDocs from "./swagger.js";

// import router
import authrouter from "./routes/auth.js";
import riwayatRouter from "./routes/riwayat.js";
import feedbackRouter from "./routes/feedback.js";
// import artikelrouter from "./routes/artikel.js";
// import statistikrouter from "./routes/statistik.js";

dotenv.config();
const app = express();

// connect ke database
connectDB();

// middleware
app.use(cors());
app.use(express.json());

// routes utama
app.use("/api/auth", authrouter);
app.use("/api/riwayat", riwayatRouter);
app.use("/api/feedback", feedbackRouter);
// app.use("/api", artikelrouter);
// app.use("/api", statistikrouter);

// Swagger setup 
swaggerDocs(app);

// Redirect
app.get("/", (req, res) => {
  res.redirect("/api-docs");
  console.log("Redirected to /api-docs");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📘 Swagger docs at http://localhost:${PORT}/api-docs`);
});
