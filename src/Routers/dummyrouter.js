import express from "express";
import auth from "../../middlewarwe/auth";
const router = express.Router();

router.post("/", auth, async (req, res) => {
  res.send("working");
});
export default router;
