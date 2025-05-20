import mongoose from "mongoose";

const riwayatSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  penyakit: String,
  akurasi: Number,
  saran: String,
  tanggal: {
    type: Date,
    default: Date.now,
  },
  image: String,
});

const Riwayat = mongoose.model("Riwayat", riwayatSchema);
export default Riwayat;
