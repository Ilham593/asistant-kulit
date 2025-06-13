import axios from "axios";

const API_URL = "https://asistant-kulit-production-7ab2.up.railway.app/api/feedback";

export const getFeedbackList = async () => {
  const res = await axios.get(API_URL);
  return res.data.data;
};

export const postFeedback = async (komentar, user) => {
  const res = await axios.post(API_URL, {
    user,
    komentar,
  });
  return res.data;
};
