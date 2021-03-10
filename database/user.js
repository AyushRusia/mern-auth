import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  Name: {
    type: String,
    default: "",
    required: true,
  },
  Email: {
    type: String,
    unique: true,
    default: "",
    required: true,
  },
  Phone: {
    type: String,
    default: "",
  },
  City: {
    type: String,
    default: "",
  },
  Password: {
    type: String,
    default: "",
    required: true,
  },
  CreatedAt: {
    type: Date,
    default: new Date().getTime(),
  },
});

const userModel = new mongoose.model("User", UserSchema);

export default userModel;
