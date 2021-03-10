import mongoose from "mongoose";

const collection = new mongoose.Schema({
  name: String,
  score: Number,
});
const dummy = new mongoose.model("dummy", collection);
export default dummy;
