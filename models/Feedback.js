import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  komentar: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model("Feedback", FeedbackSchema);
