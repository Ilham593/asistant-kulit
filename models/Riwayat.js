import mongoose from 'mongoose';

const rekomendasiSchema = new mongoose.Schema({
  nama: String,
  produk: String,
  harga: Number,
});

const riwayatSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  penyakit: String,
  confidence: Number,
  rekomendasi: [rekomendasiSchema],
  tanggal: {
    type: Date,
    default: Date.now
  }
});

const Riwayat = mongoose.model('Riwayat', riwayatSchema);
export default Riwayat;
