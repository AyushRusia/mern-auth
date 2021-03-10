import express from "express";
import mongoose from "mongoose";
import router from "./Routers/userRouter";
import cookieParser from "cookie-parser";
import router2 from "./Routers/dummyrouter";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/auth", router);
app.use("/dummy", router2);

app.get("/test", (req, res) => {
  res.send("Hi Testing");
});

app.listen(process.env.PORT, () => console.log("Listing to Port 8000"));

mongoose
  .connect("mongodb://localhost:27017/auth", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((e) => console.log(e));
