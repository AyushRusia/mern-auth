import jwt from "jsonwebtoken";
const auth = async (req, res, next) => {
  try {
    const token = await req.cookies.token;
    if (!token) return res.status(400).json("unauthorised");

    const verified = await jwt.verify(token, process.env.JWT_SECRET);

    if (!verified) return res.status(400).json("token does not matched");
    req.user = verified.user;
    //
    next();
  } catch (e) {
    console.log(e);
    res.status(400).json("unauthorised");
  }
};

export default auth;
