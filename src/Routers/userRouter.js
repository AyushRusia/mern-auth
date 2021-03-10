import express from "express";
import userModel from "../../database/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const router = express.Router();

router.use(express.json());
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    const user = await userModel.findOne({ Email: email });
    if (!user) return res.status(400).send("User Does Not Exist");

    const verify = await bcrypt.compare(password, user.Password);
    if (!verify) return res.status(400).send("Password Does Not Match");

    const token = jwt.sign({ user: user._id }, process.env.JWT_SECRET);

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .end();
  } catch (e) {
    console.log(e);
    res.status(500).json("error");
  }
});

router.get("/logout", async (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send("Log Out");
});
router.post("/register", async (req, res) => {
  try {
    const { email, name, password, phone, city } = req.body;
    console.log(email);
    if (!email || !name || !password)
      return res.status(400).json("Enter All the Fileds");

    const existingUser = await userModel.findOne({ Email: email });
    if (existingUser)
      return res.status(400).send("User Already Exist with This Email");

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = await new userModel({
      Name: name,
      Email: email,
      Phone: phone,
      City: city,
      Password: hashPassword,
    });

    const saveduser = await newUser.save();

    const token = jwt.sign({ user: saveduser._id }, process.env.JWT_SECRET);

    res.cookie("token", token, {
      httpOnly: true,
    });
    res.status(201).send(`user saved with details ${saveduser}`);
  } catch (e) {
    console.log(e);
    res.status(500).json("Error");
  }
});

export default router;
